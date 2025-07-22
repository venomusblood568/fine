"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accountName: {
        type: String,
        required: true,
        trim: true,
    },
    accountType: {
        type: String,
        enum: [
            // Physical & Digital Cash
            "Cash Wallet",
            "Digital Wallet",
            // Banking
            "Savings Account",
            "Current Account",
            "Credit Card",
            // Others
            "Investment Account",
            "Emergency Fund"
        ],
        required: true,
        trim: true,
        lowercase: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const Account = mongoose_1.default.model("Account", accountSchema);
exports.default = Account;
