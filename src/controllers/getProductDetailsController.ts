//route handler to get product details through product id from home page and user dashboard 
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const getProductDetailsController = async (req: Request, res: Response)=>{
    try{
        //get product id from request body
        const {productId} = req.body;

        //get product details for given product id from supabase
        const productDetails = await prisma.product.findUnique({
            where: {id: productId},    
        });

        //if product details not fetched, throw error
        if(!productDetails){
            throw new Error("Could not fetch product details");
        }

        //send product details with success message if product details fetched from database
        res.status(200).json({message: "Successfully fetched product details", productDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getProductDetailsController;