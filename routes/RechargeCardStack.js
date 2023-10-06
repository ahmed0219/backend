const express = require("express");
const mongoose = require("mongoose");
const SalesAgency = require("../models/SalesAgency");
const Retailer = require("../models/Retailer");
const RechargeCardStack = require("../models/RechargeCardStack");
const RCSRouter = express.Router();

RCSRouter.post("/", async (req, res) => {
  try {
    const rechargecardstack = await RechargeCardStack.create({
      amount: req.body.amount,
      quantity: req.body.quantity,
      status: req.body.status,
      SalesAgency: req.body.SalesAgency,
      Retailer: req.body.Retailer,
    });
    const salesagencyfound = await SalesAgency.findById(req.body.SalesAgency);
    const RetailerFound = await Retailer.findById(req.body.Retailer);
   
    if (!salesagencyfound && !RetailerFound) {
      return res
        .status(404)
        .send("SalesAgency not found and Retailer not found");
    } else if (salesagencyfound && RetailerFound) {
      return res.status(404).send("Provide only one SalesAgency or Retailer");
    } else if (salesagencyfound) {
      salesagencyfound.RechargeCardStack.push(rechargecardstack);
      await salesagencyfound.save();
    } else if (RetailerFound) {
      RetailerFound.RechargeCardStack.push(rechargecardstack);
      await RetailerFound.save();
        
    }
    res.json(rechargecardstack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

RCSRouter.get("/", async (req, res) => {
  try {
    const rechargecardstacks = await RechargeCardStack.find();
    res.json(rechargecardstacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

RCSRouter.delete("/", async (req, res) => {
  try {
    const rechargecardstacks = await RechargeCardStack.deleteMany();
    res.json("deleted all rechargecardstacks");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

RCSRouter.get("/:id", async (req, res) => {
  try {
    const rechargecardstack = await RechargeCardStack.findById(req.params.id);
    if (!rechargecardstack)
      return res.status(404).send("RechargeCardStack not found");
    res.json(rechargecardstack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

RCSRouter.delete("/:id", async (req, res) => {
  try {
    const rechargecardstack = await RechargeCardStack.findById(req.params.id);
    if (!rechargecardstack)
      return res.status(404).send("RechargeCardStack not found");
    await rechargecardstack.remove();
    res.json({ message: "RechargeCardStack deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
RCSRouter.patch("/:id", async (req, res) => {
  try {
    const rechargecardstack = await RechargeCardStack.findById(req.params.id);
    if (!rechargecardstack)
      return res.status(404).send("RechargeCardStack not found");
    if (req.body.amount) {
      rechargecardstack.amount = req.body.amount;
    }
    if (req.body.quantity) {
      rechargecardstack.quantity = req.body.quantity;
    }
    if (req.body.status) {
      rechargecardstack.status = req.body.status;
    }
    await rechargecardstack.save();
    res.json(rechargecardstack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
RCSRouter.get("/:id/totalPrice", async (req, res) => {
    try {
      const rechargecardstack = await RechargeCardStack.findById(req.params.id);
      if (!rechargecardstack)
        return res.status(404).send("RechargeCardStack not found");
  
      const amount = parseFloat(rechargecardstack.amount);
      const quantity = parseFloat(rechargecardstack.quantity);
  
      if (isNaN(amount) || isNaN(quantity)) {
        return res.status(400).send("Invalid amount or quantity");
      }
  
      const totalPrice = amount * quantity;
  
      res.json({ totalPrice });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = RCSRouter;
