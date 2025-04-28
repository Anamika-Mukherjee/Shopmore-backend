//api for authentication routes
import express from "express";
import assignRoleController from "../controllers/assignRoleController";

const router = express.Router();

router.post("/auth/assignRole", assignRoleController);

export default router;