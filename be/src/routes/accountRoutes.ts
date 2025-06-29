import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_account } from "../controllers/get_account";
import { create_account } from "../controllers/post_account";
const router = express.Router()

router.get("/accounts",middleware,get_account);
router.post("/create-account",middleware,create_account);

export default router;
