const mongoose = require("mongoose");
module.exports = mongoose
  .connect(
   
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err.message));
