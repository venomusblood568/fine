import { Request,Response } from "express";
import { Transaction, Account } from "../models";

export const create_transaction = async(req:Request,res:Response) => {
    try {
        const { accountId, type, amount, description ,tags, toWhom} = req.body;
        if(!req.user || !req.user.id){
            res.status(401).json({ message: "Unauthorized" });
            return
        }

        const account = await Account.findOne({_id:accountId, userId:req.user?.id})
        if(!account){
            res
              .status(404)
              .json({ message: "Account not found or unauthorized" });
              return
        }

        const transaction = await Transaction.create({
          accountId,
          userId: req.user.id,
          type,
          amount,
          description,
          tags,
          toWhom,
        });

        if(type === "Income"){
            account.balance += amount;
        }
        else if(type === "Expense"){
            account.balance -= amount;
        }

        await account.save();
        res
          .status(201)
          .json({
            message: "Transaction created",
            transaction,
            updatedBalance: account.balance,
          });
    } catch (error) {
        console.error("Error in create_transaction:", error);
        res.status(500).json({ message: "Server error" });
    }
}