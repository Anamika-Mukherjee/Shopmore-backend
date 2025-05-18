//route handler to read all product categories from admin dashboard
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const readCategoryController = async (req: Request, res: Response)=>{
    try{
       //fetch all product categories from database
       const categories = await prisma.category.findMany({
         include: {
            products: true
         }
       });

       //throw error if category data not retrieved
       if(!categories){
        throw new Error("Could not retrieve category data");
       }

       //send category data with success message if category data retrieved successfully
       res.status(200).json({message: "Successfully retrieved category data", categories});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default readCategoryController;