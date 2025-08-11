const express = require("express");
const router = express.Router();

// Temporary static products
const products = [
  { id: 1, name: "T-Shirt", price: "$20", image: "https://via.placeholder.com/300", description: "A comfy cotton T-shirt" },
  { id: 2, name: "Jeans", price: "$40", image: "https://via.placeholder.com/300", description: "Stylish blue jeans" },
  { id: 3, name: "Jacket", price: "$60", image: "https://via.placeholder.com/300", description: "Warm winter jacket" },
  { id: 4, name: "Sneakers", price: "$50", image: "https://via.placeholder.com/300", description: "Cool casual sneakers" },
];

// @GET /api/products - all products
router.get("/", (req, res) => {
  res.json(products);
});

// @GET /api/products/:id - single product
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

module.exports = router;
