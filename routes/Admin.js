const express = require("express");
const Admin = require("../models/Admin");
const adminRouter = express.Router();

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
adminRouter.get("/admin/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

adminRouter.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.json({ message: err });
  }
});

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

module.exports = adminRouter;
