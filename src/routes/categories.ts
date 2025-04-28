//apis for category routes
import express from "express";
import readCategoryController from "../controllers/readCategoryController";

const router = express.Router();

router.get("/categories", readCategoryController);


export default router;