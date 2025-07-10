import { Request,Response } from "express";
import { Stock } from "../models";

export const update_stock = async(req:Request, res:Response): Promise<void> => {
    try {
        const {id} = req.params;
        const {stockName,symbol,exchange,quantity,invested,purchaseDate,notes} = req.body;
        if(!req.user || !req.user.id){
            res.status(401).json({message:"Unauthorized"});
            return
        }
        const stock = await Stock.findOne({_id:id , userId:req.user.id});
        if(!stock){
            res.status(404).json({message:"Stock not found"});
            return
        }

        if(stockName !== undefined) stock.stockName = stockName;
        if(symbol !== undefined) stock.symbol = symbol;
        if(exchange !== undefined) stock.exchange = exchange;
        if(quantity !== undefined) stock.quantity = quantity;
        if(invested !== undefined) stock.invested = invested;
        if(purchaseDate !== undefined) stock.purchaseDate = purchaseDate;
        if(notes !== undefined) stock.notes = notes;

        await stock.save()
        res.status(200).json({message:"Stock info updated", stock});

    } catch (error) {
        console.error(`Error in updating stocks info...`,error);
        res.status(500).json({message:"Server Errror"})
    }
}