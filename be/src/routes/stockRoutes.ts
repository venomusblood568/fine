import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_stock } from "../controllers/get_stocks";

const router = express.Router()

router.get("/get_stocks", middleware,get_stock);

export default router;