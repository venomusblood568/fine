import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_transaction } from "../controllers/get_transaction";

const router = express.Router();

router.get("/get-trans",middleware,get_transaction);

export default router;