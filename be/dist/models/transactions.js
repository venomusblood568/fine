"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    accountId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["Income", "Expense"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    tags: {
        type: [String],
        set: (tags) => tags.map((tag) => tag.toLowerCase().trim()),
        default: [],
        index: true,
        validate: {
            validator: (arr) => arr.length <= 5,
            message: "Max 5 tags allowed.",
        },
    },
    toWhom: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
