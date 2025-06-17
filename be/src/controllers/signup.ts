import { Response,Request } from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async(req:Request,res:Response) =>{
    const {firstname, lastname,username,password} = req.body;
    try {
        const exitsting = await User.findOne({username});
        if(exitsting){
            res.status(400).json({message:"Username already exits"})
            return
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            firstname,
            lastname,
            username,
            password: hashedPassword,
        });
        const token = jwt.sign(
            {
                id:newUser._id
            },
            JWT_SECRET as string
        );
        res.status(201).json({message:"User created", token:token, user:newUser});

    } catch (error) {
        res.status(500).json({message:"Internal Error", error:error});
    }
}