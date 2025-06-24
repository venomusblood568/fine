import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    tags: {
      type: [String],
      set: (tags: any[]) => tags.map((tag) => tag.toLowerCase().trim()), 
      default: [],
      index: true,
      validate: {
        validator: (arr: string | any[]) => arr.length <= 5,
        message: "Max 5 tags allowed.",
      },
    },
    toWhom: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction",transactionSchema)
export default Transaction