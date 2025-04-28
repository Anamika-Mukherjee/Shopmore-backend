//apis for products routes
import express from "express";
import readProductController from "../controllers/readProductController";
import readProductDetailsController from "../controllers/readProductDetailsController";
import searchProductController from "../controllers/searchProductController";
import getSearchProductsController from "../controllers/getSearchProductsController";

const router = express.Router();

router.get("/products", readProductController);
router.get("/products/:id", readProductDetailsController);
router.get("/searchProducts", searchProductController);
router.post("/getSearchProducts", getSearchProductsController);

export default router;