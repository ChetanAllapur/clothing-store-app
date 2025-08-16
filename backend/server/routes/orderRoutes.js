// backend/server/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders - create a new order
router.post("/", async (req, res) => {
  console.log("Order received:", req.body); // Debug
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
