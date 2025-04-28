//route handler for Cashfree webhook which is triggered when payment complete
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paymentWebhookController = async (req: Request, res: Response)=>{
    try{

        //get payload from webhook request body
        const payload = req.body;

        //destructure data object from payload that contains all information about payment
        const {data} = payload;

        //destructure order and payment objects from data object 
        const {order, payment} = data;

        //destructure order id and order tags from order and then link id from order tags object
        const {order_id: orderId, order_tags} = order;
        const {link_id: linkId} = order_tags;

        //destructure payment status from payment object
        const {payment_status: paymentStatus} = payment;

        //update payment status and store order id in database for the given payment  
        const paymentData = await prisma.payment.update({
            where: {linkId},
            data: {
                orderId,
                status: String(paymentStatus),
            }
        });

        //if payment data not updated, throw error
        if(!paymentData){
            throw new Error("Could not update payment details in database");
        }

        //send success message if payment details updated
        res.status(200).json({message: "Successfully updated payment data"});
    }
    catch(err: any){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

export default paymentWebhookController;