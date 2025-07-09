import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_stock } from "../controllers/get_stocks";
import { post_stock } from "../controllers/create_stock";
import { get_stocks_with_live_data } from "../controllers/stock_price";

const router = express.Router();

// Routes
router.get("/get_stocks", middleware, get_stock);
router.post("/post_stock", middleware, post_stock);
router.get("/get_stocks_price", middleware, get_stocks_with_live_data);

export default router;
