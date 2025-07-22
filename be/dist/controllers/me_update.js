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
exports.me_update = void 0;
const models_1 = require("../models");
const me_update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstname, lastname, mail, occupation, phone, location } = req.body;
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const userAccount = yield models_1.User.findById(req.user.id);
        if (!userAccount) {
            res.status(404).json({ messgae: "Account not found or unauthorized" });
            return;
        }
        if (firstname !== undefined)
            userAccount.firstname = firstname;
        if (lastname !== undefined)
            userAccount.lastname = lastname;
        if (mail !== undefined)
            userAccount.mail = mail;
        if (occupation !== undefined)
            userAccount.occupation = occupation;
        if (phone !== undefined)
            userAccount.phone = phone;
        if (location !== undefined)
            userAccount.location = location;
        yield userAccount.save();
        res.status(200).json({ message: "Account Update", userAccount });
    }
    catch (error) {
        console.log(`Error in updating account:`, error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.me_update = me_update;
