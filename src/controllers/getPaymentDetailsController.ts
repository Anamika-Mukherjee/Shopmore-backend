//route handler to get current payment details from payment redirect page
import { Request, Response} from "express";
import prisma from "../utils/prismaClient";

const getPaymentDetailsController = async (req: Request, res: Response)=>{
    try{

        //get user id and payment link id from request body
        const {userClerkId, linkId } = req.body;

        //get payment details for given user id and link id from supabase
        const paymentDetails = await prisma.payment.findUnique({
            where: {
                userId: userClerkId,
                linkId,
            }
        });

        //if payment details not fetched, throw error
        if(!paymentDetails){
            throw new Error("Could not fetch payment details");
        }
        
        //get user details for given user id from supabase
        const userDetails = await prisma.user.findUnique({
            where: {clerkId: userClerkId}
        })

        //if user details not fetched, throw error
        if(!userDetails){
            throw new Error("Could not fetch user details");
        }

        //send payment and user details with success message if details fetched from database
        res.status(200).json({message: "Successfully fetched payment and user details", paymentDetails, userDetails});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default getPaymentDetailsController;