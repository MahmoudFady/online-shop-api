const { calcProductPrice } = require("../helper/cart");
const Cart = require("../models/cart");
const Product = require("../models/product");
module.exports.pushProduct = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const productId = req.params["productId"];
    const { _id, price, discountPercentage } = await Product.findById(
      productId
    ).select("price discountPercentage");
    const productPrice = calcProductPrice(price, discountPercentage);
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title brand thumbnail price discountPercentage",
    });
    if (cart) {
      cart.products.push({
        product: productId,
        quantity: 1,
        totalPrice: price,
        totalPriceAfterDiscount: productPrice,
      });
      cart.totalPrice += price;
      cart.totalPriceAfterDiscount += productPrice;
      cart.totalQuantity += 1;
      cart.totalProducts += 1;
      await cart.save();
      return res.status(200).json({ message: "your cart updated", cart });
    }
    const createdCart = await new Cart({
      user: userId,
      products: [
        {
          product: _id,
          quantity: 1,
          totalPrice: price,
          totalPriceAfterDiscount: productPrice,
        },
      ],
      totalQuantity: 1,
      totalProducts: 1,
      totalPrice: price,
      totalPriceAfterDiscount: productPrice,
    }).save();
    res.status(200).json({ message: "your cart created", cart: createdCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.increaseQuantity = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const productId = req.params["productId"];
    const { price, discountPercentage } = await Product.findById(
      productId
    ).select("price discountPercentage");
    const productPrice = calcProductPrice(price, discountPercentage);
    const cart = await Cart.findOneAndUpdate(
      {
        user: userId,
        "products.product": productId,
      },
      {
        $inc: {
          "products.$.quantity": 1,
          "products.$.totalPrice": price,
          "products.$.totalPriceAfterDiscount": productPrice,
          totalQuantity: 1,
          totalPrice: price,
          totalPriceAfterDiscount: productPrice,
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "products.product",
      select: "title brand thumbnail price discountPercentage",
    });
    res.status(200).json({ message: "incease product quantity in cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.decreaseQuantity = async (decode, req, res, next) => {
  try {
    const userId = decode.userId;
    const productId = req.params.productId;
    const cart = await Cart.findOne({
      user: userId,
    }).populate({
      path: "products.product",
      select: "title brand thumbnail price discountPercentage",
    });
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
    if (cart.totalProducts === 0) {
      cart.delete();
      return res.status(200).json({ message: "cart deleted" });
    }
    await cart.save();
    res.status(200).json({ message: "product quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
