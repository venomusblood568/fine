import { Request,Response } from "express";
import { Account } from "../models";

export const update_account = async(req:Request,res:Response):Promise<void> => {
    try {
        const{id} = req.params;
        const{accountName,accountType,balance} = req.body;
        if(!req.user || !req.user.id){
            res.status(401).json({ message: "Unauthorized" });
            return
        } 
        const account = await Account.findOne({ _id: id, userId: req.user.id });
        if(!account){
            res
              .status(404)
              .json({ message: "Account not found or unauthorized" });
              return
        }

        if(accountName !== undefined) account.accountName = accountName;
        if(accountType !== undefined) account.accountType = accountType;
        if(balance !== undefined) account.balance = balance;

        await account.save()
        res.status(200).json({ message: "Account updated", account });


    } catch (error) {
        console.error("Error in updating account:", error);
        res.status(500).json({ message: "Server Error" });
    }
}