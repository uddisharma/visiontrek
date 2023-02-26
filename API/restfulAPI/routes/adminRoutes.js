import express from "express";
import adminController from "../controllers/admincontroller.js";
const router = express.Router();

// router.post("/adminreg", adminController.adminreg);
router.post("/admin", adminController.Admin);

export default router;
