const Cart = require("../models/cart");
module.exports.getByUserId = (userId) => {
  return Cart.findOne({ user: userId }).populate({
    path: "products.product",
    select: "title brand thumbnail price discountPercentage",
  });
};
module.exports.createCart = (userId, productId, price, priceAfterDiscount) => {
  return new Cart({
    user: userId,
    products: [
      {
        product: productId,
        quantity: 1,
        totalPrice: price,
        totalPriceAfterDiscount: priceAfterDiscount,
      },
    ],
    totalQuantity: 1,
    totalProducts: 1,
    totalPrice: price,
    totalPriceAfterDiscount: priceAfterDiscount,
  }).save();
};
module.exports.saveChanges = (cart) => {
  return cart.save();
};
module.exports.decrProductQuan = async (cart) => {
  let message;
  if (cart.totalProducts === 0) {
    cart.remove();
    message = "cart  has ben deleted";
    return { message, cart: null };
  }
  message = "product removed from cart";
  cart = await cart.save();
  return { cart, message };
};
