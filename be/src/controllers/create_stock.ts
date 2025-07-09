import { Request, Response } from "express";
import { Stock } from "../models";
import dotenv from "dotenv";

dotenv.config();

export const post_stock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ messgae: "Unauthorized" });
    }
    const {
      stockName,
      symbol,
      exchange,
      quantity,
      invested,
      purchaseDate,
      notes,
    } = req.body;
    if (
      !stockName ||
      !symbol ||
      !exchange ||
      !quantity ||
      !invested ||
      !purchaseDate
    ) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    const newStock = new Stock({
      userId,
      stockName: stockName.trim(),
      symbol: stockName.trim().toUpperCase(),
      quantity: parseFloat(quantity),
      invested: parseFloat(invested),
      purchaseDate: new Date(purchaseDate),
      exchange: exchange || "NSE",
      notes: notes?.trim() || "",
    })

    const saved = await newStock.save()
    res.status(201).json({ message: "Stock added", stock: saved });
  } catch (error) {
    console.error("Error adding stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
