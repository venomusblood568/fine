import { Request, Response } from "express";
import { Transaction } from "../models";

export const get_transaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await Transaction.find({ userId: req.user?.id })
      .sort({ date: -1 })
      .populate("accountId", "accountName")
      .exec();
    if (!req.user || !req.user.id) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    res.status(200).json({ transaction });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error while fetching transactions." });
  }
};
