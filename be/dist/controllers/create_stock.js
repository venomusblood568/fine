"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_stock = void 0;
const models_1 = require("../models");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const post_stock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ messgae: "Unauthorized" });
        }
        const { stockName, symbol, exchange, quantity, invested, purchaseDate, notes, } = req.body;
        if (!stockName ||
            !symbol ||
            !exchange ||
            !quantity ||
            !invested ||
            !purchaseDate) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }
        const newStock = new models_1.Stock({
            userId,
            stockName: stockName.trim(),
            symbol: stockName.trim().toUpperCase(),
            quantity: parseFloat(quantity),
            invested: parseFloat(invested),
            purchaseDate: new Date(purchaseDate),
            exchange: exchange || "NSE",
            notes: (notes === null || notes === void 0 ? void 0 : notes.trim()) || "",
        });
        const saved = yield newStock.save();
        res.status(201).json({ message: "Stock added", stock: saved });
    }
    catch (error) {
        console.error("Error adding stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.post_stock = post_stock;
