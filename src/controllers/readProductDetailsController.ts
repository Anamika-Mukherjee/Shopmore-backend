//route handler to read product details for a given product id
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const readProductDetailsController = async (req: Request, res: Response)=>{
    try{
       //get product id from request params
       const {id} = req.params;

      //get product details for given product id from supabase 
       const productDetails = await prisma.product.findUnique({
        where: {id},
        include: {
            category: true,
         },
       });

       //if product details not fetched, throw error
       if(!productDetails){
        throw new Error("Could not retrieve product details");
       }

       //send product details with success message if product details fetched from database
       res.status(200).json({message: "Successfully retrieved product details", productDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default readProductDetailsController;