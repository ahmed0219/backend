const mongoose = require("mongoose");
const RechargeCardStackSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    SalesAgency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesAgency",
    },
  },
  {
    Retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
    },
    timestamps: true,
  }
);

const RechargeCardsStack = mongoose.model(
  "RechargeCardsStack",
  RechargeCardStackSchema
);
module.exports = RechargeCardsStack;
