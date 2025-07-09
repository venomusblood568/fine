import { Response, Request } from "express";
import {Stock} from "../models";
import dotenv from "dotenv";

dotenv.config();

export const get_stock = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const stocks = await Stock.find({ userId: req.user.id });

    if (stocks.length === 0) {
      res
        .status(200)
        .json({ stocks: [], message: "Need to add stocks to list" });
      return;
    }

    res.status(200).json({ stocks });
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
