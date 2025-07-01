import { Request,Response } from "express";
import { Transaction,Account } from "../models";

export const delete_transaction = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;
        if(!req.user || !req.user.id){
            res.status(401).json({ message: "Unauthorized" });
        }

        const transaction = await Transaction.findOne({_id:id,userId:req.user?.id})
        if(!transaction){
            res
              .status(404)
              .json({ message: "Transaction not found or unauthorized" });
            return
        }

        const account = await Account.findOne({_id:transaction.accountId, userId:req.user?.id})
        if(!account){
            res.status(404).json({ message: "Associated account not found" });
            return
        }
        if(transaction.type === "Income"){
            account.balance -= transaction.amount;
        }else if(transaction.type === "Expense"){
            account.balance += transaction.amount
        }
        await account.save()
        await transaction.deleteOne();
        res
          .status(200)
          .json({
            message: "Transaction deleted successfully",
            updatedBalance: account.balance,
          });
    } catch (error) {
        console.log("Error in delete_transaction",error);
        res.status(500).json({message:"Server Error"})
    }
}