const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    SalesAgencies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SalesAgency" },
    ],
  },

  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);



module.exports = Admin;
