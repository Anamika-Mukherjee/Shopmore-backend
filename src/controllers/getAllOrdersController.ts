//route handler to get all orders by customers from admin dashboard
import { Request, Response} from "express";
import prisma from "../utils/prismaClient";

const getAllOrdersController = async (req: Request, res: Response)=>{
    try{
       //get all orders from supabase 
       const orders = await prisma.order.findMany();

       //if orders not fetched, throw error
       if(!orders){
        throw new Error("Could not retrieve orders");
       }

       //send order details with success message if order details fetched from database
       res.status(200).json({message: "Successfully retrieved all orders", orders});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getAllOrdersController;