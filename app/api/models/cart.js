const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      totalPrice: Number,
      totalPriceAfterDiscount: Number,
    },
  ],
  totalProducts: Number,
  totalQuantity: Number,
  totalPrice: Number,
  TotalPriceAfterDiscount: Number,
});
module.exports = mongoose.model("Cart", cartSchema);
