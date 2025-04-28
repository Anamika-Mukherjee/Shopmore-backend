//route handler to search products entered in search bar
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const searchProductController = async (req: Request, res: Response)=>{
    try{        
        //get search query string from request query
        const {query} = req.query;
        
        //return with error message if query is not sent or is not of string type
        if (typeof query !== "string" || query.trim() === "") {
            res.status(400).json({ message: "Query parameter is required."});
            return;
        }
        
        //fetch products based on query from database
        const searchResults = await prisma.product.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive', 
                },
              },
              {
                description: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
        });

        //return with message if no products matches the search query
        if(!searchResults){
            res.status(200).json({message: "No matches found"});
        }
    
        //send search results if products found for given query
        res.status(200).json({searchResults});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default searchProductController;