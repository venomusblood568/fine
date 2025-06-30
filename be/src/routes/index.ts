import express from "express";
import testRoutes from "./testRoutes";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";
import transactionsRoutes from "./transactionsRoutes";


const router = express.Router();

router.use("/test",testRoutes);
router.use("/auth",authRoutes);
router.use("/acc",accountRoutes);
router.use("/trans",transactionsRoutes);

export default router;