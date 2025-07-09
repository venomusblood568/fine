import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stockName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    priceBoughtAt: {
      type: Number,
      required: true,
      min: 0,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    exchange: {
      type: String,
      enum: ["NSE", "BSE"],
      default: "NSE",
    },
    symbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
