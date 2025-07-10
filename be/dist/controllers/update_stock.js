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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_stock = void 0;
const models_1 = require("../models");
const update_stock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { stockName, symbol, exchange, quantity, invested, purchaseDate, notes } = req.body;
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const stock = yield models_1.Stock.findOne({ _id: id, userId: req.user.id });
        if (!stock) {
            res.status(404).json({ message: "Stock not found" });
            return;
        }
        if (stockName !== undefined)
            stock.stockName = stockName;
        if (symbol !== undefined)
            stock.symbol = symbol;
        if (exchange !== undefined)
            stock.exchange = exchange;
        if (quantity !== undefined)
            stock.quantity = quantity;
        if (invested !== undefined)
            stock.invested = invested;
        if (purchaseDate !== undefined)
            stock.purchaseDate = purchaseDate;
        if (notes !== undefined)
            stock.notes = notes;
        yield stock.save();
        res.status(200).json({ message: "Stock info updated", stock });
    }
    catch (error) {
        console.error(`Error in updating stocks info...`, error);
        res.status(500).json({ message: "Server Errror" });
    }
});
exports.update_stock = update_stock;
