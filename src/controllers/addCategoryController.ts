//route handler to add new category from admin dashboard
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const addCategoryController = async (req: Request, res: Response)=>{
    try{
       
       //get category data from request body 
       const {categoryName, categoryDescription} = req.body;
 
       //get image files from req.files through multer
       const imageFiles = req.files as Express.Multer.File[];

       //map through all image files and upload each file in cloudinary 
       const uploadPromises = imageFiles.map((file)=>{
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        return cloudinary.uploader.upload(base64String, {
          folder: "categories",
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

       //create new category in supabase through prisma with the given category details and image url
       const categories = await prisma.category.create({
        data: {
            name: categoryName,
            description: categoryDescription,
            imageUrls
        },
       });

       //throw error if category not created
       if(!categories){
        throw new Error("Could not add category data");
       }

       //fetch updated categories
       const updatedCategories = await prisma.category.findMany();

       //throw error if updated categories not fetched
       if(!updatedCategories){
        throw new Error("Could not fetch updated categories");
       }

       //return updated categories and success message if new category stored in database
       res.status(200).json({message: "Successfully stored category data", updatedCategories});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default addCategoryController;