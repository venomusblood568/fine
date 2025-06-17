import express from "express";
import testRoutes from "./testRoutes";
import authRoutes from "./authRoutes";
const router = express.Router();

router.use("/test",testRoutes);
router.use("/auth",authRoutes);
export default router;