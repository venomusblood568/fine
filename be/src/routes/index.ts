import express from "express";
import testRoutes from "./testRoutes";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";
import transactionsRoutes from "./transactionsRoutes";
import stockRoutes from "./stockRoutes";

const router = express.Router();

router.use("/test",testRoutes);
router.use("/auth",authRoutes);
router.use("/acc",accountRoutes);
router.use("/trans",transactionsRoutes);
router.use("/stock",stockRoutes);

export default router;