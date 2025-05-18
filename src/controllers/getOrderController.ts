//route handler to get user order details through order id from user dashboard
import { Request, Response} from "express";
import prisma from "../utils/prismaClient";

const getOrderController = async (req: Request, res: Response)=>{
    try{
        //get user id and order id from request body
        const {userClerkId, orderId} = req.body;

        //get order details for given user id and order id from supabase
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
                userId: userClerkId,
            },    
        });

        //if order details not fetched, throw error
        if(!order){
            throw new Error("Could not fetch order");
        }

        //send order details with success message if order details fetched from database
        res.status(200).json({message: "Successfully fetched order", order});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getOrderController;