//route handler to delete product from admin dashboard
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteProductController = async (req: Request, res: Response )=>{
    try{
      //get product id from request params
       const {id} = req.params;

       //delete product from database with the given product id
       await prisma.product.delete({
        where: {id}
        });

       //send success message if product deleted 
       res.status(200).json({message: "Successfully deleted product"});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default deleteProductController;