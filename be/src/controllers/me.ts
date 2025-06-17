import { Response,Request } from "express";
import User from "../models/user";

export const getme = async(req:Request, res:Response) => {
    try {
        if(!req.user){
            res.status(401).json({message:"Unauthorized"});
            return
        }
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            res.status(404).json({message:"user not found"});
            return
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}
