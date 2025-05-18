//route handler to get user cart details from user dashboard
import { Request, Response} from "express";
import prisma from "../utils/prismaClient";

const getCartDetailsController = async (req: Request, res: Response)=>{
    try{
        //get user id from request body
        const {userClerkId} = req.body;

        //get cart details for given user id from supabase
        const cartDetails = await prisma.cart.findUnique({
            where: {userId: userClerkId},
            include: {
                items: true,
            }
        });

        //if cart details not fetched, throw error
        if(!cartDetails){
            throw new Error("Could not fetch cart details");
        }

        //send cart details with success message if cart details fetched from database
        res.status(200).json({message: "Successfully fetched cart details", cartDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getCartDetailsController;