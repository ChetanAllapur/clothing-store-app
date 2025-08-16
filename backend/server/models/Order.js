const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
