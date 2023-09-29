const mongoose = require("mongoose");
const RechargeCardStackSchema = new mongoose.Schema(
  {
    Amount: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },

    Status: {
      type: String,
      required: true,
    },

    Retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
    },
    SalesAgency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesAgency",
    },
  },
  {
    timestamps: true,
  }
);

const RechargeCardsStack = mongoose.model("SalesAgency", salesAgencySchema);
module.exports = RechargeCardsStack;
