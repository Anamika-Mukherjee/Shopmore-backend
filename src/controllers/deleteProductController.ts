//route handler to delete product from admin dashboard
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const deleteProductController = async (req: Request, res: Response )=>{
    try{
      //get product id from request params
       const {id} = req.params;

       //delete product from database with the given product id
       await prisma.product.delete({
        where: {id}
        });

        //fetch updated products
        const updatedProducts = await prisma.product.findMany();

        //throw error if updated products not fetched
        if(!updatedProducts){
            throw new Error("Could not fetch updated products");
        }

       //send updated products and success message if product deleted 
       res.status(200).json({message: "Successfully deleted product", updatedProducts});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default deleteProductController;