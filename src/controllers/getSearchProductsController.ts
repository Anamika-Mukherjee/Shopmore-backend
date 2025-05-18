//route handler to get product details through product ids from search results page (products searched by user) 
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";
import {Product} from "../utils/types";

const getSearchProductsController = async (req: Request, res: Response)=>{
    try{

        //get product ids for searched products from request body
        const {productIds} = req.body;
      
        //initialize empty array to store product details
        let searchProducts: Product[] = [];
        
        //map through all product ids and fetch product details from database for each product id
        const queryPromises = productIds.map(async (productId: string)=>{
           const product = await prisma.product.findUnique({
            where: {id: productId}
           });
           
           //push product details to searchProducts array if product details available
           if(product){
            searchProducts.push(product);
           }

        })

        //store the api response for all apis to the database in a variable
        const searchResults = await Promise.all(queryPromises);

        //if no api response, throw error
        if(!searchResults){
            throw new Error("Could not fetch search results");
        }

        //return search results with success message if searched products found
        res.status(200).json({message: "Successfully fetched searched products", searchProducts});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getSearchProductsController;