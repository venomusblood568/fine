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
exports.delete_transaction = void 0;
const models_1 = require("../models");
const delete_transaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const transaction = yield models_1.Transaction.findOne({ _id: id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!transaction) {
            res
                .status(404)
                .json({ message: "Transaction not found or unauthorized" });
            return;
        }
        const account = yield models_1.Account.findOne({ _id: transaction.accountId, userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id });
        if (!account) {
            res.status(404).json({ message: "Associated account not found" });
            return;
        }
        if (transaction.type === "Income") {
            account.balance -= transaction.amount;
        }
        else if (transaction.type === "Expense") {
            account.balance += transaction.amount;
        }
        yield account.save();
        yield transaction.deleteOne();
        res
            .status(200)
            .json({
            message: "Transaction deleted successfully",
            updatedBalance: account.balance,
        });
    }
    catch (error) {
        console.log("Error in delete_transaction", error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.delete_transaction = delete_transaction;
