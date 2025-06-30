"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middlewares/middleware");
const get_transaction_1 = require("../controllers/get_transaction");
const router = express_1.default.Router();
router.get("/get-trans", middleware_1.middleware, get_transaction_1.get_transaction);
exports.default = router;
