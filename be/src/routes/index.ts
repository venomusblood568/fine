import express from "express";
import testRoutes from "./testRoutes";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";

const router = express.Router();

router.use("/test",testRoutes);
router.use("/auth",authRoutes);
router.use("/acc",accountRoutes);
export default router;