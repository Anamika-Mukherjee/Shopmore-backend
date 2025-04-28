//route handler to read all products
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const readProductController = async (req: Request, res: Response)=>{
    try{
      //fetch all products from database
       const products = await prisma.product.findMany();

       //throw error if product data not retrieved
       if(!products){
        throw new Error("Could not retrieved product data");
       }

       //send product data with success message if product data retrieved successfully
       res.status(200).json({message: "Successfully retrieved product data", products});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default readProductController;