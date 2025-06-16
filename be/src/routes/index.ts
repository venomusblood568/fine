import express from "express";
import testRoutes from "./testRoutes";

const router = express.Router();

router.use("/test",testRoutes);

export default router;