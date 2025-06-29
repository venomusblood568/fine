import { Request, Response } from "express";
import { Account } from "../models";

export const delete_account = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const account = await Account.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!account) {
      res.status(404).json({ message: "Account not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in delete_account:", error);
    res.status(500).json({ message: "Server error" });
  }
};
