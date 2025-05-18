//route handler to update admin information from admin dashboard
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";
import { clerk } from "../utils/clerkClient";

const updateAdminInfoController = async (req: Request, res: Response)=>{
    try{
        
        //get admin details from request body
        const {userClerkId, email, name, contactNumber} = req.body;
    
        //fetch user details for given user id from clerk database
        const clerkUser = await clerk.users.getUser(userClerkId);

        //throw error if user not available in clerk database
        if(!clerkUser){
            throw new Error("Clerk user not found");
        }

        //update user public metadata in clerk if user available
        await clerk.users.updateUser(userClerkId, {

            publicMetadata: {
                role: "ADMIN", 
                name,
                contactNumber,
             },

        });

        //update user information in supabase 
        const user = await prisma.user.update({
            where: { clerkId: userClerkId },
            data: { 
                email,
                name,
                contactNumber,
            },
        });

        //throw error if user not updated in database
        if(!user){
            throw new Error("Could not update user details")
        }

        //send success message if user details updated successfully
        res.status(200).json({message: "Successfully updated user details"});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default updateAdminInfoController;