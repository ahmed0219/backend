const mongoose = require("mongoose");

const salesAgencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    //email: {
    // type: String,
    // required: true,
    //},
    city: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      rquired: true,
    },
  },

  {
    timestamps: true,
  }
);

const SalesAgency = mongoose.model("SalesAgency", salesAgencySchema);

module.exports = SalesAgency;
