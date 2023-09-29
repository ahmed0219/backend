const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },

  RechargeCardStack: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RechargeCardStack",
    },
  ],
});

const Retailer = mongoose.model("Retailer", retailerSchema);
module.exports = Retailer;
