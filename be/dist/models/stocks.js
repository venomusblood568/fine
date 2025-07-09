"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stockSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    stockName: {
        type: String,
        required: true,
    },
    quanity: {
        type: Number,
        required: true,
        min: 1,
    },
    priceBoughtAt: {
        type: Number,
        required: true,
        min: 0,
    },
    purchaseDate: {
        type: Date,
        require: true,
    },
    exchange: {
        type: String,
        enum: ["NSE", "BSE"],
        default: "NSE",
    },
    symbol: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: "",
    },
}, { timestamps: true });
const Stock = mongoose_1.default.model("Stock", stockSchema);
exports.default = Stock;
