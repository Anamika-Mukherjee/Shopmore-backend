//route handler to get user details through user id for given orders from admin dashboard 
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const getUserDetailsController = async (req: Request, res: Response)=>{
    try{
        //get user id from request body
        const {userClerkId} = req.body;

        //get user details for given user id from supabase
        const userDetails = await prisma.user.findUnique({
            where: {clerkId: userClerkId}
        })

        //if user details not fetched, throw error
        if(!userDetails){
            throw new Error("Could not fetch user details");
        }

        //send user details with success message if user details fetched from database
        res.status(200).json({message: "Successfully fetched user details", userDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getUserDetailsController;