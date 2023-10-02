const mongoose = require("mongoose");
module.exports = mongoose
  .connect(
    "mongodb+srv://ahmedselmi939:KX7vnKPb87Rat5v4@mongodb-demo.vwqrfix.mongodb.net/distribution_cards?retryWrites=true&w=majority&appName=AtlasApp"
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err.message));
