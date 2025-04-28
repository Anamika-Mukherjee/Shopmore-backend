//route handler to get all order details for a given user from user dashboard
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getOrderDetailsController = async (req: Request, res: Response)=>{
    try{        
        //get user id from request body
        const {userClerkId} = req.body;

        //get order details for given user id from supabase
        const orderDetails = await prisma.order.findMany({
            where: {
                userId: userClerkId,
            }
        });

        //if order details not fetched, throw error
        if(!orderDetails){
            throw new Error("Could not fetch order details");
        }
        
        //send order details with success message if order details fetched from database
        res.status(200).json({message: "Successfully fetched order details", orderDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getOrderDetailsController;