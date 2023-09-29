const express = require("express");
const Admin = require("../models/Admin");
const adminRouter = express.Router();

//post

adminRouter.post("/", async (req, res) => {
  try {
    const admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.json(admin);
  } catch (err) {
    res.json({ message: err });
  }
});
//get all admins
adminRouter.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.json({ message: err });
  }
});

//get by id
adminRouter.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin not found!" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//delete
adminRouter.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (admin) {
      res.json({ message: "Admin deleted successfully!" });
    } else {
      res.status(404).json({ message: "Admin not found!" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//update
adminRouter.patch("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
    });
    if (admin) {
      res.json({ message: "Admin updated successfully!" });
    } else {
      res.status(404).json({ message: "Admin not found!" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});
//adminRouter.patch("/:name", async (req, res) => {
//  try {
//    const admin = await Admin.findOneAndUpdate(req.params.name, {
//      name: req.body.name,
//      email: req.body.email,
//    });
//    if (admin) {
//      res.json({ message: "Admin updated successfully!" });
//    } else {
//      res.status(404).json({ message: "Admin not found!" });
//    }
//  } catch (err) {
//    res.json({ message: err });
//  }
//});

//delete all
adminRouter.delete("/", async (req, res) => {
  try {
    const admin = await Admin.deleteMany();
    if (admin) {
      res.json({ message: "Admins deleted successfully!" });
    } else {
      res.status(404).json({ message: "Admins not found!" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//delete by name
//adminRouter.delete("/:name", async (req, res) => {
//  try {
//    const admin = await Admin.deleteOne({ name: req.params.name });
//    if (admin) {
//      res.json({ message: "Admin deleted successfully!" });
//    } else {
//      res.status(404).json({ message: "Admin not found!" });
//    }
//  } catch (err) {
//    res.json({ message: err });
//  }
//});

module.exports = adminRouter;
