const cartAccessDB = require("../access-db/cart");
const productAccessDB = require("../access-db/product");
const { calcProductPrice } = require("../helper/cart");
const cartHelper = require("../helper/cart");
module.exports.pushProduct = async (userId, productId) => {
  const { price, discountPercentage } = await productAccessDB.getById(
    productId
  );
  const priceAfterDiscount = calcProductPrice(price, discountPercentage);
  let cart = await cartAccessDB.getByUserId(userId);
  let message = "";
  if (!cart) {
    cart = await cartAccessDB.createCart(
      userId,
      productId,
      price,
      priceAfterDiscount
    );
    message = "cart created";
  } else {
    cart = cartHelper.handlePushProduct(
      cart,
      productId,
      price,
      priceAfterDiscount
    );
    console.log(cart);
    cart = await cartAccessDB.saveChanges(cart);
    message = "new product added to cart";
  }
  return { message, cart };
};
module.exports.popProduct = async (userId, productId) => {
  let cart = await cartAccessDB.getByUserId(userId);
  cart = cartHelper.handlePopProduct(cart, productId);
  return cartAccessDB.decrProductQuan(cart);
};
module.exports.increaseProductQuantity = async (userId, productId) => {
  const { price, discountPercentage } = await productAccessDB.getById(
    productId
  );
  const priceAfterDiscount = calcProductPrice(price, discountPercentage);
  let cart = await cartAccessDB.getByUserId(userId);
  cart = cartHelper.handleIncrProductQuan(
    cart,
    productId,
    price,
    priceAfterDiscount
  );
  cart = await cartAccessDB.saveChanges(cart);
  return { cart, message: "product quantity increased" };
};
module.exports.decreaseProductQuantity = async (userId, productId) => {
  const { price, discountPercentage } = await productAccessDB.getById(
    productId
  );
  const priceAfterDiscount = calcProductPrice(price, discountPercentage);
  let cart = await cartAccessDB.getByUserId(userId);
  cart = cartHelper.handleDecrProductQuan(
    cart,
    productId,
    price,
    priceAfterDiscount
  );
  return cartAccessDB.decrProductQuan(cart);
};
module.exports.getByUserId = (userId) => {
  return cartAccessDB.getByUserId(userId);
};
