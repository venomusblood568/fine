import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountName: {
      type: String,
      required: true,
      trim: true,
    },
    accountType: {
      type: String,
      enum: [
        "cash wallet",
        "digital wallet",
        "savings account",
        "current account",
        "credit card",
        "investment account",
        "emergency fund",
      ],
      required: true,
      trim: true,
      lowercase: true,
    },

    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
