//admin apis (all protected routes)
import express from "express";
import multer from "multer";
import addProductController from "../controllers/addProductController";
import editProductController from "../controllers/editProductController";
import deleteProductController from "../controllers/deleteProductController";
import { protectAdminRoutes } from "../middleware/protectAdminRoutes";
import addCategoryController from "../controllers/addCategoryController";
import getAllOrdersController from "../controllers/getAllOrdersController";
import createAdminController from "../controllers/createAdminController";
import updateAdminInfoController from "../controllers/updateAdminInfoController";
import getAllAdminsController from "../controllers/getAllAdminsController";

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

//call protect routes middleware for all admin routes
router.use("/admin", protectAdminRoutes);

//all admin routes
router.post("/admin/products", upload.array("productImages"), addProductController);
router.put("/admin/products/:id", upload.array("productImages"), editProductController);
router.delete("/admin/products/:id", upload.array("productImages"), deleteProductController);
router.post("/admin/categories", upload.array("categoryImages"), addCategoryController);
router.get("/admin/orders", getAllOrdersController);
router.post("/admin/createAdmin", createAdminController);
router.post("/admin/updateAdminInfo", updateAdminInfoController);
router.get("/admin/getAllAdmins", getAllAdminsController);

export default router;