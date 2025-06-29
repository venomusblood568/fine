import express from "express";
import { middleware } from "../middlewares/middleware";
import { get_account } from "../controllers/get_account";
import { create_account } from "../controllers/create_account";
import { update_account } from "../controllers/update_account";
import { delete_account } from "../controllers/delete_account";


const router = express.Router()

router.get("/accounts",middleware,get_account);
router.post("/create-account",middleware,create_account);
router.put("/update-account/:id",middleware,update_account);
router.delete("/delete-account/:id", middleware, delete_account);

export default router;
