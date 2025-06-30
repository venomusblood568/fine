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
exports.create_transaction = void 0;
const models_1 = require("../models");
const create_transaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { accountId, type, amount, description, tags, toWhom } = req.body;
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const account = yield models_1.Account.findOne({ _id: accountId, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!account) {
            res
                .status(404)
                .json({ message: "Account not found or unauthorized" });
            return;
        }
        const transaction = yield models_1.Transaction.create({
            accountId,
            userId: req.user.id,
            type,
            amount,
            description,
            tags,
            toWhom,
        });
        if (type === "Income") {
            account.balance += amount;
        }
        else if (type === "Expense") {
            account.balance -= amount;
        }
        yield account.save();
        res
            .status(201)
            .json({
            message: "Transaction created",
            transaction,
            updatedBalance: account.balance,
        });
    }
    catch (error) {
        console.error("Error in create_transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.create_transaction = create_transaction;
