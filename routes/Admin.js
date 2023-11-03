const express = require("express");
const Admin = require("../models/Admin");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");

adminRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const findUser = await Admin.findOne({ email });

    if (findUser) {
      console.log(email);
      return res.status(400).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ name, email, password: hashedPassword });

    res.status(201).send("Registered successfully!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

adminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await Admin.findOne({ email });

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
