const express = require("express");
const RetailerRouter = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const SalesAgency = require("../models/SalesAgency");
const Retailer = require("../models/Retailer");
const bcrypt = require("bcrypt");

RetailerRouter.post("/register", async (req, res) => {
  try {
    const { Email, password } = req.body;

    const findUser = await Retailer.findOne({ Email });

    if (findUser) {
      console.log(Email);
      return res.status(400).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const retailer = await Retailer.create({
      Name: req.body.Name,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
      Email: req.body.Email,
      Admin: req.body.Admin,
      SalesAgency: req.body.SalesAgency,
      password: hashedPassword,
    });
    const adminFound = await Admin.findById(req.body.Admin);
    const salesAgencyFound = await Retailer.findById(req.body.SalesAgency);

    if (!adminFound && !salesAgencyFound) {
      return res.status(404).send("Admin not found and Sales Agency not found");
    } else if (adminFound && salesAgencyFound) {
      return res.status(404).send("Provide only one Admin or Sales Agency");
    } else if (adminFound) {
      adminFound.Retailer.push(retailer);
      await adminFound.save();
    } else if (salesAgencyFound) {
      salesAgencyFound.Retailer.push(retailer);

      await salesAgencyFound.save();
    }

    res.json(retailer);

    res.status(201).send("Registered successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
RetailerRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await Retailer.findOne({ email });

    if (!findUser) {
      return res.status(400).send("Wrong email or password !");
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (passwordMatch) {
      res.status(200).send("Logged in successfully!");
    } else {
      res.status(400).send("Wrong email or password !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

RetailerRouter.post("/", async (req, res) => {
  try {
    const retailer = await Retailer.create({
      Name: req.body.Name,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
      Email: req.body.Email,
      Admin: req.body.Admin,
      SalesAgency: req.body.SalesAgency,
    });

    const adminFound = await Admin.findById(req.body.Admin);
    const salesAgencyFound = await Retailer.findById(req.body.SalesAgency);

    if (!adminFound && !salesAgencyFound) {
      return res.status(404).send("Admin not found and Sales Agency not found");
    } else if (adminFound && salesAgencyFound) {
      return res.status(404).send("Provide only one Admin or Sales Agency");
    } else if (adminFound) {
      adminFound.Retailer.push(retailer);
      await adminFound.save();
    } else if (salesAgencyFound) {
      salesAgencyFound.Retailer.push(retailer);

      await salesAgencyFound.save();
    }

    res.json(retailer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

RetailerRouter.get("/", async (req, res) => {
  try {
    const retailers = await Retailer.find();
    res.json(retailers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get retailer by id
RetailerRouter.get("/:id", async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id);
    if (!retailer) return res.status(404).send("Retailer not found");
    res.json(retailer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

RetailerRouter.delete("/:id", async (req, res) => {
  try {
    const retailer = await Retailer.findById(req.params.id);

    if (!retailer) {
      return res.status(404).send("Retailer not found");
    }

    const adminId = retailer.Admin;
    const salesAgencyId = retailer.SalesAgency;

    if (adminId) {
      await Admin.findByIdAndUpdate(adminId, {
        $pull: { Retailers: retailer._id },
      });
    }

    if (salesAgencyId) {
      await Retailer.findByIdAndUpdate(salesAgencyId, {
        $pull: { Retailers: retailer._id },
      });
    }

    await Retailer.findByIdAndRemove(req.params.id);

    res.json({ message: "Retailer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

RetailerRouter.patch("/:id", async (req, res) => {
  try {
    const updateSalesAgency = await Retailer.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          Name: req.body.Name,
          Address: req.body.Address,
          PhoneNumber: req.body.PhoneNumber,
          Email: req.body.Email,
        },
      },
      { new: true }
    );
    res.json(updateSalesAgency);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

RetailerRouter.delete("/", async (req, res) => {
  try {
    await Retailer.deleteMany();
    res.json({ message: "All Retailers deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = RetailerRouter;
