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
        trim: true,
        minlength: 1,
    },
    symbol: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    exchange: {
        type: String,
        enum: ["NSE", "BSE"],
        default: "NSE",
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    invested: {
        type: Number,
        required: true,
        min: 0,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        default: "",
        trim: true,
    },
}, { timestamps: true });
const Stock = mongoose_1.default.model("Stock", stockSchema);
exports.default = Stock;
