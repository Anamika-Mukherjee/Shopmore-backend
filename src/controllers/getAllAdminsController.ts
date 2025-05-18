//route handler to get all admin details from admin dashboard
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const getAllAdminsController = async (req: Request, res: Response)=>{
    try{
        
        //get all admins from supabase 
        const allAdmins = await prisma.admin.findMany();

        //if admins not fetched, throw error
        if(!allAdmins){
            throw new Error("Could not retrieve admin data");
        }

        //send admin details with success message if admin details fetched from database
        res.status(200).json({message: "Successfully retrieved admin data", allAdmins});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getAllAdminsController;