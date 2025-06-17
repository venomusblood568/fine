import express from "express";
import {signup} from "../controllers/signup";
import { login } from "../controllers/login";
import {getme} from "../controllers/me";
import { middleware } from "../middlewares/middleware";
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/getme",middleware,getme)
export default router;