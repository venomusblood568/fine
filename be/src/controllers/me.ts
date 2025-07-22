import { Response, Request } from "express";
import User from "../models/user";
import Account from "../models/account";

export const getme = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    //User info 
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    //No of cards
    const cardCount = await Account.countDocuments({
      userId: req.user.id,
      accountType: {
        $in: ["credit card", "savings account", "current account"],
      },
    });
    console.log("[BACKEND] Found cards:", cardCount);
    const includeTypes = [
      "cash wallet",
      "digital wallet",
      "savings account",
      "current account",
    ];

    const includedAccount = await Account.find({
        userId : req.user.id,
        accountType:{$in: includeTypes},
    });


    const totalBalance = includedAccount.reduce(
        (sum,acc) => sum + acc.balance , 0
    )

    res
      .status(200)
      .json({ user, cardCount, totalWalletBalance: totalBalance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
