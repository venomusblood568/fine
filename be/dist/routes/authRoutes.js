"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("../controllers/signup");
const login_1 = require("../controllers/login");
const me_1 = require("../controllers/me");
const middleware_1 = require("../middlewares/middleware");
const router = express_1.default.Router();
router.post("/signup", signup_1.signup);
router.post("/login", login_1.login);
router.get("/getme", middleware_1.middleware, me_1.getme);
exports.default = router;
