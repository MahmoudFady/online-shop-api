const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  discountPercentage: {
    type: Number,
    get: function (value) {
      return Math.round(value);
    },
  },
  rating: Number,
  thumbnail: String,
  images: Array,
  stock: Number,
});
module.exports = mongoose.model("Product", productSchema);
