import { Request,Response } from "express";
import { Account } from "../models";
export const create_account = async(req: Request, res:Response): Promise<void> => {
    try {
       const {accountName, accountType, balance} = req.body;
       if(!req.user){
        res.status(401).json({ message: "Unauthorized" });
        return;
       } 
       if(!accountName || !accountType){
        res.status(400).json({ message: "Account name and type are required" });
        return;
       }
       const newAccount = new Account({
        userId: req.user.id,
        accountName,
        accountType,
        balance: balance ?? 0,
       })

       await newAccount.save()
       res
         .status(201)
         .json({
           message: "Account created successfully",
           account: newAccount,
         });
    } catch (error) {
        console.log(`Error in create account`, error)
        res.status(500).json({ message: "Server Error" });
    }
}