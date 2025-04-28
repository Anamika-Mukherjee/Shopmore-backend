//route handler to create payment link through Cashfree
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import {CreateLinkResponse} from "../utils/types";

const prisma = new PrismaClient();

const createPaymentLinkController = async (req: Request, res: Response)=>{
    try{
        //get payment order details from request body
        const {orderAmount, customerId, customerName, customerEmail, customerPhone, paymentPurpose, productId, productQuantity } = req.body;

        //calculate link expiry time from current time
        const expiryTime = DateTime.now()
            .setZone("Asia/Kolkata")
            .plus({ hours: 24 })
            .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");


        //define headers for Cashfree payment link creation api    
        const headers = {
            "x-api-version": "2023-08-01",
            "x-client-id": process.env.CASHFREE_APP_ID!,
            "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
            "Content-Type": "application/json"
        }

        //generate unique id for payment
        const uniqueId = `order_${Date.now()}`;

        //define order and customer details to be sent with api request body
        const paymentData = {
            link_id: uniqueId,
            link_currency: "INR",
            link_amount: Number(orderAmount),
            customer_details: {
                customer_id: String(customerId),
                customer_name: String(customerName),
                customer_email: String(customerEmail),
                customer_phone: String(customerPhone),
            },
            link_notify: {
                send_sms: false,
                send_email: false,
            },
            link_purpose: String(paymentPurpose),
            link_expiry_time: expiryTime,
            link_auto_close: true,
            link_meta: {
                return_url: `${process.env.FRONTEND_URL}/user/payment-redirect?link_id={link_id}`,
            },
            order_tags: {
                link_id: uniqueId
            }
        }

        //api request to Cashfree to generate payment link
        const response = await fetch(`${process.env.CASHFREE_TEST_URL}/pg/links`, {
            method: "POST",
            headers,
            body: JSON.stringify(paymentData),
        });

        const data: CreateLinkResponse = await response.json();

        //if api response not successful, throw error
        if(response.status !== 200){
            console.log(response);
            throw new Error("Could not create payment link");
        }

        //get link details from api response id link generated successfully
        const {link_id, link_amount, link_currency, link_created_at, link_url} = data;

        //store payment order details in database
        const order = await prisma.payment.create({
           data: {
            linkId: link_id,
            amount: link_amount,
            currency: link_currency,
            status: "PENDING",  
            createdAt: new Date(link_created_at),
            userId: customerId, 
            productId,
            productQuantity,
           } 
        });

        //throw error if details not stored
        if(!order){
            throw new Error("Could not store order details in database");
        }

        //extract link id, payment link and order amount from Cashfree api response to be sent to frontend
        const orderData = {
            linkId: link_id,
            paymentLink: link_url, 
            orderAmount: link_amount
        }

        //send order details with success message if payment link created
        res.status(200).json({message: "Successfully created payment link", orderData});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default createPaymentLinkController;