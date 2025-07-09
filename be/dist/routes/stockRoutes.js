"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middlewares/middleware");
const get_stocks_1 = require("../controllers/get_stocks");
const router = express_1.default.Router();
router.get("/get_stocks", middleware_1.middleware, get_stocks_1.get_stock);
exports.default = router;
