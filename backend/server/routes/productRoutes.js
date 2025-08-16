const express = require("express");
const router = express.Router();

// Temporary static products (with _id and numeric price)
const products = [
  { _id: "1", name: "T-Shirt", price: "20", image: "https://via.placeholder.com/300", description: "A comfy cotton T-shirt" },
  { _id: "2", name: "Jeans", price: "40", image: "https://via.placeholder.com/300", description: "Stylish blue jeans" },
  { _id: "3", name: "Jacket", price: "60", image: "https://via.placeholder.com/300", description: "Warm winter jacket" },
  { _id: "4", name: "Sneakers", price: "50", image: "https://via.placeholder.com/300", description: "Cool casual sneakers" },
];

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});

// GET single product by _id
router.get("/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

module.exports = router;
