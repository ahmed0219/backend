const express = require("express");
const SalesAgency = require("../models/SalesAgency");
const Admin = require("../models/Admin");
const salesAgencyRouter = express.Router();

salesAgencyRouter.post("/", async (req, res) => {
  try {
    const salesAgency = await SalesAgency.create({
      name: req.body.name,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      city: req.body.city,
      email: req.body.email,
      admin: req.body.admin,
    });

  
    const adminFound = await Admin.findById(req.body.admin);
    if (!adminFound) return res.status(404).send("Admin not found");
    adminFound.SalesAgencies.push(salesAgency);

    await adminFound.save();
    res.json(salesAgency);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

salesAgencyRouter.get("/", async (req, res) => {
  try {
    const salesAgencies = await SalesAgency.find();
    res.json(salesAgencies);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


salesAgencyRouter.get("/:id", async (req, res) => {
  try {
    const salesAgency = await SalesAgency.findById(req.params.id);
    if (!salesAgency) return res.status(404).send("SalesAgency not found");
    res.json(salesAgency);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});



salesAgencyRouter.delete("/:id", async (req, res) => {
  try {
    const salesAgency = await SalesAgency.findById(req.params.id);
    if (!salesAgency) return res.status(404).send("SalesAgency not found");

    const adminId = salesAgency.admin;
    const admin = await Admin.findById(adminId);

    if (!admin) return res.status(404).send("Admin not found");

    admin.SalesAgencies.pull(salesAgency._id);
    await admin.save();

    await SalesAgency.findByIdAndRemove(req.params.id);

    res.json({ message: "SalesAgency deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


salesAgencyRouter.patch("/:id", async (req, res) => {
  try {
    const updatedSalesAgency = await SalesAgency.findOneAndUpdate(
      { _id: req.params.id }, // Assuming id is the unique identifier for your SalesAgency
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          phonenumber: req.body.phonenumber,
          email: req.body.email,
          city: req.body.city,
        }
      },
      { new: true } 
    );
    res.json(updatedSalesAgency);    
  } catch (err) {
    res.json({ message: err });
  }
});

//delete all sales agencies
salesAgencyRouter.delete("/", async (req, res) => {
  try {
    const salesAgencies = await SalesAgency.deleteMany();
    res.json({ message: "All SalesAgencies deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = salesAgencyRouter;
