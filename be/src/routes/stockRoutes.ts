import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_stock } from "../controllers/get_stocks";
import { post_stock } from "../controllers/create_stock";
import { update_stock } from "../controllers/update_stock";
import { delete_stock } from "../controllers/delete_stock";

const router = express.Router();

// Routes
router.get("/get_stocks", middleware, get_stock);
router.post("/post_stock", middleware, post_stock);
router.put("/update_stock/:id", middleware, update_stock);
router.delete("/delete_stock/:id",middleware,delete_stock);

export default router;
