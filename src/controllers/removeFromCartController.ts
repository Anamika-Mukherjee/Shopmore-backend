//route handler to remove item from user cart from user dashboard
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const removeFromCartController = async (req: Request, res: Response)=>{
    try{
        //get user id and product id from request body
        const {userClerkId, productId} = req.body;

        //get cart details for given user id from database
        let cart = await prisma.cart.findUnique({
            where: {userId: userClerkId},
        });

        //throw error if user cart not available
        if(!cart){
            throw new Error("Cart not available");
        }

        //fetch cart item that matches given product id from database
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
            }
        });

        //return with message if cart item not available in cart
        if(!cartItem){
            res.status(200).json("Item not available in cart");
            return;
        }

        //delete given cart item from cartItem table in database
        const removeFromCart = await prisma.cartItem.delete({
            where: {
                id: cartItem.id,
            }
        });

        //throw error if cart item not removed
        if(!removeFromCart){
            throw new Error("Could not remove cart item");
        }

        //fetch updated cart details from database to be sent to frontend
        const cartDetails = await prisma.cart.findUnique({
            where: {userId: userClerkId},
            include: {
                items: true,
            }
        });

        //throw error if cart details not fetched
        if(!cartDetails){
            throw new Error("Could not fetch cart details");
        }

        //send updated cart details with success message if cart details fetched successfully
        res.status(200).json({message: "Successfully removed item to cart", cartDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default removeFromCartController;