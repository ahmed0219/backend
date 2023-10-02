const mongoose = require("mongoose");

const QRCodeSchema = new mongoose.Schema({
  ScanDate: {
    type: Date,
    required: true,
  },
  ScanResult: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  //CardStatus: {
  //    type: String,
  //    required: true,
  //},

  Retailer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
  },
  SalesAgency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesAgency",
  },
}); 
const Qrcode= mongoose.model("Qrcode", QRCodeSchema);

module.exports=Qrcode;
