import { Response, Request } from "express";
import {Account} from "../models";
import dotenv from "dotenv";


dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const get_account = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const account = await Account.find({ userId: req.user.id });
    if (account.length === 0) {
      res.status(200).json({ account: [] });
    }
    res.status(200).json({ account });
  } catch (error) {
    console.log("Error in get_account: ", error);
    res.status(500).json({ message: "Server Errro" });
  }
};