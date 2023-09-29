const express = require("express");
const SalesAgency = require("../models/SalesAgency");
const Admin = require("../models/Admin");
const salesAgencyRouter = express.Router();

//post
salesAgencyRouter.post("/", async (req, res) => {
  try {
    const salesAgency = await SalesAgency.create({
      name: req.body.name,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      city: req.body.city,
      // email: req.body.email,
      admin: req.body.admin,
    });

    // find the admin
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

// get all sales agencies
salesAgencyRouter.get("/", async (req, res) => {
  try {
    const salesAgencies = await SalesAgency.find();
    res.json(salesAgencies);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// get the sales agency by id
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





// delete the sales agency by id

salesAgencyRouter.delete("/:id", async (req, res) => {
  try {
    const salesAgency = await SalesAgency.findByIdAndDelete(req.params.id);
    if (!salesAgency) return res.status(404).send("SalesAgency not found");
    res.json({ message: "SalesAgency deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
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
