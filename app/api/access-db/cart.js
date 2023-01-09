const Cart = require("../models/cart");
const { calcProductPrice } = require("../helper/cart");
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
module.exports.pushProduct = (cart, productId, price, discount) => {
  const priceAfterDiscount = calcProductPrice(price, discount);
  cart.products.push({
    product: productId,
    quantity: 1,
    totalPrice: price,
    totalPriceAfterDiscount: priceAfterDiscount,
  });
  cart.totalPrice += price;
  cart.totalPriceAfterDiscount += priceAfterDiscount;
  cart.totalQuantity += 1;
  cart.totalProducts += 1;
  return cart.save();
};
module.exports.popProduct = (cart, productId) => {
  const productIndex = cart.products.findIndex(
    (obj) => obj.product._id == productId
  );
  console.log(cart);
  const popedProduct = cart.products[productIndex];
  cart.totalPrice -= popedProduct.totalPrice;
  cart.totalPriceAfterDiscount -= popedProduct.totalPriceAfterDiscount;
  cart.totalQuantity -= popedProduct.quantity;
  cart.totalProducts -= 1;
  cart.products.splice(productIndex, 1);
  return cart;
};
module.exports.increaseQuantity = (userId, productId, price, discount) => {
  const priceAfterDiscount = calcProductPrice(price, discount);
  return Cart.findOneAndUpdate(
    {
      user: userId,
      "products.product": productId,
    },
    {
      $inc: {
        "products.$.quantity": 1,
        "products.$.totalPrice": price,
        "products.$.totalPriceAfterDiscount": priceAfterDiscount,
        totalQuantity: 1,
        totalPrice: price,
        totalPriceAfterDiscount: priceAfterDiscount,
      },
    },
    {
      new: true,
    }
  ).populate({
    path: "products.product",
    select: "title brand thumbnail price discountPercentage",
  });
};
module.exports.decreaseQuantity = (cart, productId) => {
  const productIndex = cart.products.findIndex(
    (obj) => obj.product._id == productId
  );
  const { price, discountPercentage } = cart.products[productIndex].product;
  const productPrice = calcProductPrice(price, discountPercentage);
  cart.totalPrice -= price;
  cart.totalPriceAfterDiscount -= productPrice;
  cart.totalQuantity -= 1;
  cart.products[productIndex].quantity -= 1;
  cart.products[productIndex].totalPrice -= price;
  cart.products[productIndex].totalPriceAfterDiscount -= productPrice;
  cart.products[productIndex].totalQuantity -= 1;
  if (cart.products[productIndex].quantity === 0) {
    cart.products.splice(productIndex, 1);
    cart.totalProducts -= 1;
  }
  return cart;
};
