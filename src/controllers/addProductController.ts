//route handler to add new product from admin dashboard
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const prisma = new PrismaClient();

const addProductController = async (req: Request, res: Response)=>{
    try{
        //get product data from request body 
        const {productName, productCategory, productDescription, productPrice, productStock} = req.body;
    
        //get image files from req.files through multer
        const imageFiles = req.files as Express.Multer.File[];

        //map through all image files and upload each file in cloudinary 
        const uploadPromises = imageFiles.map((file)=>{
                const base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
                return cloudinary.uploader.upload(base64String, {
                    folder: "products",
                });
        });
       
        //store the upload api response from cloudinary in a variable
        const uploadResults = await Promise.all(uploadPromises);

        //throw error if no uploadResults
        if(!uploadResults){
            throw new Error("Could not upload image files to cloudinary")
        }

        //map through the cloudinary api response and retrieve image url 
        const imageUrls = uploadResults.map((result) => result.secure_url);

        //create new product in supabase through prisma with the given product details and image url
        const products = await prisma.product.create({
            data: {
                name: productName,
                categoryId: productCategory,
                description: productDescription,
                price: Number(productPrice),
                stock: Number(productStock),
                imageUrls
            },
        });

        //throw error if product not created
        if(!products){
            throw new Error("Could not add product data");
        }

        const updatedProducts = await prisma.product.findMany();

        if(!updatedProducts){
            throw new Error("Could not fetch updated products");
        }

        //return success message if new product stored in database
        res.status(200).json({message: "Successfully stored product data", updatedProducts});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default addProductController;