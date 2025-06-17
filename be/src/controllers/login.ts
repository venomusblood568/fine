import { Response,Request} from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async(req:Request,res:Response) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user){
            res.status(404).json({message:"user not found"});
            return;
        }
        if(!user.password){
            res.status(500).json({message:"Password not stored in database"});
            return
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).json({message:"Invalid Credentials"});
            return
        }
        const token = jwt.sign(
            {id: user._id, username:user.username},
            JWT_SECRET as string,
            {
                expiresIn:"1h",
            }
        )
        res.status(200).json({message:"Login successful", token, user});
    } catch (error) {
        res.status(500).json({message:"Login Failed", error});
    }
}