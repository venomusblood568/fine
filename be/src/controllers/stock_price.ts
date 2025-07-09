// controllers/stock_price.ts
import { Request, Response } from "express";
import { Stock } from "../models";

export const get_stocks_with_live_data = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const stocks = await Stock.find({ userId });
    if (stocks.length === 0) {
      res.status(200).json({ stocks: [] });
      return;
    }

    const symbols = stocks.map((s) => s.symbol).join(",");

    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`
    );
    const data = await response.json();

    const prices = data?.quoteResponse?.result || [];

    const enriched = stocks.map((s) => {
      const match = prices.find((p: any) => p.symbol === s.symbol);
      const currentPrice = match?.regularMarketPrice || 0;
      const investedValue = s.quantity * s.invested;
      const currentValue = s.quantity * currentPrice;
      const profitLoss = currentValue - investedValue;
      const profitLossPercent =
        investedValue > 0 ? (profitLoss / investedValue) * 100 : 0;

      return {
        ...s.toObject(),
        currentPrice,
        currentValue,
        investedValue,
        profitLoss,
        profitLossPercent: profitLossPercent.toFixed(2),
      };
    });

    res.status(200).json({ stocks: enriched });
  } catch (err) {
    console.error("Error fetching stock prices:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
