import express from "express";
import {signup} from "../controllers/signup";
import { login } from "../controllers/login";
import {getme} from "../controllers/me";
import { middleware } from "../middlewares/middleware";
import { me_update } from "../controllers/me_update";
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/getme",middleware,getme)
router.put("/updateme/:id",middleware,me_update);

export default router;