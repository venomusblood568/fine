import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_transaction } from "../controllers/get_transaction";
import { create_transaction } from "../controllers/create_transaction";
const router = express.Router();

router.get("/get-trans",middleware,get_transaction);
router.post("/post-trans",middleware,create_transaction);

export default router;