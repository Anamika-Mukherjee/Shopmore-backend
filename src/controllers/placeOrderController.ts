//route handler to create order when payment complete
import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

const placeOrderController = async (req: Request, res: Response)=>{
    try{
        //get user id, product id and payment id from request body
        const {userClerkId, productId, paymentId, paymentOrderId} = req.body;

        //check if an order already exists in order table for given payment
        const existingOrder = await prisma.order.findFirst({
            where: {
              paymentId,
            },
        });
      
        //if order already exists, return existing order details with a message
        if (existingOrder) {
            res.status(200).json({ message: "Order already placed", orderPlaced: existingOrder });
            return;
        }

        //get payment details for current successful payment with given order id
        const isPaymentSuccess = await prisma.payment.findFirst({
            where: {
                orderId: paymentOrderId,
                status: "SUCCESS",
            },
        });

        //throw error if payment details not fetched
        if(!isPaymentSuccess){
            throw new Error("Could not confirm payment success status");
        }

        //get payment id, amount and product quantity from payment details
        const {id, amount, productQuantity} = isPaymentSuccess;

        //add order details in database
        const orderPlaced = await prisma.order.create({
            data:{
                amount,
                productId,
                quantity: productQuantity,
                userId: userClerkId,
                paymentId: id
            }
        });

        //if order details not created, throw error
        if(!orderPlaced){
            throw new Error("Could not place order");
        }
        
        //send order details with success message if order created successfully
        res.status(200).json({message: "Successfully placed order", orderPlaced});
    }
    catch(err: any){
       res.status(500).json({message: err.message});
    }
}

export default placeOrderController;