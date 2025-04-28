//apis for all user routes
import express from "express";

import addToCartController from "../controllers/addToCartController";
import getCartDetailsController from "../controllers/getCartDetailsController";
import removeFromCartController from "../controllers/removeFromCartController";
import getUserDetailsController from "../controllers/getUserDetailsController";
import createPaymentLinkController from "../controllers/createPaymentLinkController";
import paymentWebhookController from "../controllers/paymentWebhookController";
import getPaymentDetailsController from "../controllers/getPaymentDetailsController";
import getOrderController from "../controllers/getOrderController";
import getProductDetailsController from "../controllers/getProductDetailsController";
import placeOrderController from "../controllers/placeOrderController";
import getOrderDetailsController from "../controllers/getOrderDetailsController";
import updateUserInfoController from "../controllers/updateUserInfoController";

const router = express.Router();

router.post("/user/addToCart", addToCartController);
router.post("/user/getCartDetails", getCartDetailsController);
router.post("/user/removeFromCart", removeFromCartController);
router.post("/user/createPaymentLink", createPaymentLinkController);
router.post("/user/getUserDetails", getUserDetailsController);
router.post("/user/paymentWebhook", paymentWebhookController);
router.post("/user/getPaymentDetails", getPaymentDetailsController);
router.post("/user/placeOrder", placeOrderController);
router.post("/user/getOrder", getOrderController);
router.post("/user/getProductDetails", getProductDetailsController);
router.post("/user/getOrderDetails", getOrderDetailsController);
router.post("/user/updateUserInfo", updateUserInfoController);

export default router;