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
exports.get_transaction = void 0;
const models_1 = require("../models");
const get_transaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const transaction = yield models_1.Transaction.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id })
            .sort({ date: -1 })
            .populate("accountId", "accountName")
            .exec();
        if (!req.user || !req.user.id) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        res.status(200).json({ transaction });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Server error while fetching transactions." });
    }
});
exports.get_transaction = get_transaction;
