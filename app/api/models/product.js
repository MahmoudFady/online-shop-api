const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  discountPercentage: {
    type: Number,
  },
  rating: Number,
  thumbnail: String,
  images: Array,
  stock: Number,
});
module.exports = mongoose.model("Product", productSchema);
