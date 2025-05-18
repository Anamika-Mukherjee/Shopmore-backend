//route handler to add item in user cart from user dashboard
import { Request, Response} from "express";
import prisma from "../utils/prismaClient";

const addToCartController = async (req: Request, res: Response)=>{
    try{
        //get user id, product id, and product quantity from request body
        const {userClerkId, productId, quantity} = req.body;

        //retrive user's cart through user id from database
        let cart = await prisma.cart.findUnique({
            where: {userId: userClerkId},
        });

        //if user cart not available, create new cart
        if(!cart){
            cart = await prisma.cart.create({
                data: {
                    userId: userClerkId,
                }
            });
        }

        //check if given product already in user's cart
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
            }
        });

        //if given product already in user's cart, update the quantity and increase it by the quantity value received from frontend
        if(existingCartItem){
            const addedToCart = await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: existingCartItem.quantity + quantity
                }
            });

            if(!addedToCart){
                throw new Error("Could not add cart item");
            }
        }
        //if given product not in user's cart, create new cart item with the given product details
        else{
            const addedToCart = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                }
            });

            if(!addedToCart){
                throw new Error("Could not add cart item");
            }
        }

        //get updated cart details with cart items from database
        const cartDetails = await prisma.cart.findUnique({
            where: {userId: userClerkId},
            include: {
                items: true,
            }
        });

        //throw error if cart details not available
        if(!cartDetails){
            throw new Error("Could not fetch cart details");
        }

        //send cart details and success message to frontend if cart updated successfully
        res.status(200).json({message: "Successfully added item to cart", cartDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default addToCartController;