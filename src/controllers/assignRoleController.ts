//route handler to assign role and store user details for recently signed up user
import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { clerk } from "../utils/clerkClient";

const prisma = new PrismaClient();

const assignRoleController = async (req: Request, res: Response)=>{
    try{
        //get user details from request body
        const {clerkId, email, name, contactNumber} = req.body;
    
        //throw error if all fields not present
        if(!clerkId || !email || !name || !contactNumber){
            throw new Error("Missing fields");
        }

        //define variable to store signed up user role to default value "USER"
        let assignedRole: Role = Role.USER;

        //get all existing users from database
        const existingUsers = await prisma.user.findMany();

        //if current user is first user to sign up, automatically assign "ADMIN" role 
        if(existingUsers.length === 0){
            assignedRole = Role.ADMIN;
        }
        else{
            //if current user is not first sign up, check if current user's email is in admin list created by first admin
            const isAllowedAdmin = await prisma.admin.findUnique({
                where: {email},
            });
            
            //if current signed up user's email present in admin list, assign role as "ADMIN" 
            if(isAllowedAdmin){
                assignedRole = Role.ADMIN;
            }
        }

        //store user details in clerk user public metadata
        await clerk.users.updateUser(clerkId, {
            publicMetadata: { 
                role: assignedRole,
                name,
                contactNumber,
             },

        });

        //store user details in database
        const user = await prisma.user.upsert({
            where: { clerkId },
            update: { role: assignedRole },
            create: { clerkId, email, role: assignedRole, name, contactNumber },
        });

        //throw error if user details not stored in database
        if(!user){
            throw new Error("Could not update user details")
        }

        //create user cart if role "USER"
        if(user.role === "USER"){
            const userCart = await prisma.cart.create({
                data:{
                   userId: user.clerkId,
                }
            });

            if(!userCart){
                throw new Error("Could not create user cart");
            }
        }

        //send user role value and success message to frontend if user details and role stored successfully
        res.status(200).json({message: "Successfully stored user details", userRole: user.role});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default assignRoleController;