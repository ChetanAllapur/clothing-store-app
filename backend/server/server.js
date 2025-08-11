const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes")); // ✅ New products route

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
