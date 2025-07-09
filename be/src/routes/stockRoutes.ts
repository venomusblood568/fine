import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_stock } from "../controllers/get_stocks";
import { post_stock } from "../controllers/create_stock";

const router = express.Router();

// Routes
router.get("/get_stocks", middleware, get_stock);
router.post("/post_stock", middleware, post_stock);


export default router;
