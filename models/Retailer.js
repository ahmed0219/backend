const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  salesAgency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesAgency",
  },
  rechargeCardStack: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RechargeCardStack",
    },
  ],
});

const Retailer = mongoose.model("Retailer", retailerSchema);
module.exports = Retailer;
