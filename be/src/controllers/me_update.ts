import { Request,Response } from "express";
import { User } from "../models";

export const me_update = async(req:Request,res:Response):Promise<void> => {
    try {
        const {id} = req.params;
        const{firstname,lastname,mail,occupation,phone,location} = req.body;
        if(!req.user || !req.user.id){
            res.status(401).json({message:"Unauthorized"})
            return
        }
        const userAccount = await User.findById(req.user.id);
        if(!userAccount){
            res.status(404).json({messgae:"Account not found or unauthorized"})
            return
        } 
        if(firstname !== undefined) userAccount.firstname = firstname;
        if(lastname !== undefined) userAccount.lastname = lastname;
        if(mail !== undefined) userAccount.mail = mail;
        if(occupation !== undefined) userAccount.occupation = occupation;
        if(phone !== undefined) userAccount.phone = phone;
        if(location !== undefined) userAccount.location = location;

        await userAccount.save()
        res.status(200).json({message:"Account Update",userAccount})

    } catch (error) {
        console.log(`Error in updating account:`,error);
        res.status(500).json({message:"Server Error"});
    }
}