import { Request, Response } from "express";
import { Stock } from "../models";


export const delete_stock = async(req:Request, res:Response): Promise<void> => {
    try {
        const{id} = req.params;
        if(!req.user || !req.user.id){
            res.status(401).json({message:"Unauthorized"});
            return;
        }
        const stock = await Stock.findOneAndDelete({
            _id : id,
            userId: req.user.id,
        })
        if(!stock){
            res.status(404).json({message:"Stock not found"});
            return;
        }
        res.status(200).json({message:"Stock removed from list"});
    } catch (error) {
        console.error("Error in deleting stock",error);
        res.status(500).json({message:"Server Error"})
    }
}