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
exports.create_account = void 0;
const models_1 = require("../models");
const create_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountName, accountType, balance } = req.body;
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (!accountName || !accountType) {
            res.status(400).json({ message: "Account name and type are required" });
            return;
        }
        const newAccount = new models_1.Account({
            userId: req.user.id,
            accountName,
            accountType,
            balance: balance !== null && balance !== void 0 ? balance : 0,
        });
        yield newAccount.save();
        res
            .status(201)
            .json({
            message: "Account created successfully",
            account: newAccount,
        });
    }
    catch (error) {
        console.log(`Error in create account`, error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.create_account = create_account;
