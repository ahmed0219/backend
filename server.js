require("./utils/dbConnect");
const express = require("express");
const app = express();
const adminRouter = require("./routes/Admin");
const salesAgencyRouter = require("./routes/SalesAgency");

app.use(express.json());
app.use("/admin", adminRouter);
app.use("/salesagency",salesAgencyRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
