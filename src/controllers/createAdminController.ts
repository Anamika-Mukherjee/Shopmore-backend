//route handler to add new admin from admin dashboard
import { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAdminController = async (req: Request, res: Response)=>{
    try{
        //get admin details from request body
        const {adminName, adminEmail, adminContactNumber} = req.body;
        
        //create new admin in database
        const admin = await prisma.admin.create({
            data:{
                name: adminName,
                email: adminEmail,
                contactNumber: adminContactNumber,
            }
        });

        //throw error if admin not created
        if(!admin){
            throw new Error("Could not add admin");
        }
        
        //send success message to frontend if new admin is added
        res.status(200).json({message: "Successfully added admin"});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default createAdminController;