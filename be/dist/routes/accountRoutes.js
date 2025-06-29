"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middlewares/middleware");
const get_account_1 = require("../controllers/get_account");
const create_account_1 = require("../controllers/create_account");
const update_account_1 = require("../controllers/update_account");
const router = express_1.default.Router();
router.get("/accounts", middleware_1.middleware, get_account_1.get_account);
router.post("/create-account", middleware_1.middleware, create_account_1.create_account);
router.put("/update-account/:id", middleware_1.middleware, update_account_1.update_account);
exports.default = router;
