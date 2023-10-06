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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      rquired: true,
    },
    Retailer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Retailer" }],
  },

  {
    timestamps: true,
  }
);

salesAgencySchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    const adminId = this.admin; // Assuming you have an admin field in SalesAgency

    try {
      const admin = await Admin.findById(adminId);
      if (admin) {
        admin.SalesAgencies.pull(this._id); // Assuming SalesAgencies is an array of SalesAgency IDs in Admin
        await admin.save();
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);
const SalesAgency = mongoose.model("SalesAgency", salesAgencySchema);
module.exports = SalesAgency;
