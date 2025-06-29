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
exports.update_account = void 0;
const models_1 = require("../models");
const update_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { accountName, accountType, balance } = req.body;
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const account = yield models_1.Account.findOne({ _id: id, userId: req.user.id });
        if (!account) {
            res
                .status(404)
                .json({ message: "Account not found or unauthorized" });
            return;
        }
        if (accountName !== undefined)
            account.accountName = accountName;
        if (accountType !== undefined)
            account.accountType = accountType;
        if (balance !== undefined)
            account.balance = balance;
        yield account.save();
        res.status(200).json({ message: "Account updated", account });
    }
    catch (error) {
        console.error("Error in update_account:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.update_account = update_account;
