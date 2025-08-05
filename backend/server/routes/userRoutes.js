const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Get current logged-in user
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
