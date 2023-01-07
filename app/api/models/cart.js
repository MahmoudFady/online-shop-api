const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  products: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        totalPrice: Number,
        totalPriceAfterDiscount: Number,
      },
    ],
  },
  totalProducts: Number,
  totalQuantity: Number,
  totalPrice: Number,
  totalPriceAfterDiscount: Number,
});
module.exports = mongoose.model("Cart", cartSchema);
