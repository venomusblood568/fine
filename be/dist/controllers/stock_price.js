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
exports.get_stocks_with_live_data = void 0;
const models_1 = require("../models");
const get_stocks_with_live_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const stocks = yield models_1.Stock.find({ userId });
        if (stocks.length === 0) {
            res.status(200).json({ stocks: [] });
            return;
        }
        const symbols = stocks.map((s) => s.symbol).join(",");
        const response = yield fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`);
        const data = yield response.json();
        const prices = ((_b = data === null || data === void 0 ? void 0 : data.quoteResponse) === null || _b === void 0 ? void 0 : _b.result) || [];
        const enriched = stocks.map((s) => {
            const match = prices.find((p) => p.symbol === s.symbol);
            const currentPrice = (match === null || match === void 0 ? void 0 : match.regularMarketPrice) || 0;
            const investedValue = s.quantity * s.invested;
            const currentValue = s.quantity * currentPrice;
            const profitLoss = currentValue - investedValue;
            const profitLossPercent = investedValue > 0 ? (profitLoss / investedValue) * 100 : 0;
            return Object.assign(Object.assign({}, s.toObject()), { currentPrice,
                currentValue,
                investedValue,
                profitLoss, profitLossPercent: profitLossPercent.toFixed(2) });
        });
        res.status(200).json({ stocks: enriched });
    }
    catch (err) {
        console.error("Error fetching stock prices:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.get_stocks_with_live_data = get_stocks_with_live_data;
