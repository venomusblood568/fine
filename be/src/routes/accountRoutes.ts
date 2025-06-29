import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_account } from "../controllers/get_account";

const router = express.Router()

router.get("/accounts",middleware,get_account);

export default router;
