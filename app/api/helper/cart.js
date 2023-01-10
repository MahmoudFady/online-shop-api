module.exports.calcProductPrice = (price, discount) => {
  const priceAfterDiscount = price - price * (discount / 100);
  return Math.round(priceAfterDiscount);
};
module.exports.updateCart = (
  cart,
  price,
  priceAfterDiscount,
  quantity = 1,
  total = 1
) => {
  cart.totalPrice += price;
  cart.totalPriceAfterDiscount += priceAfterDiscount;
  cart.totalQuantity += quantity;
  cart.totalProducts += total;
  return cart;
};
module.exports.handlePushProduct = (
  cart,
  productId,
  price,
  priceAfterDiscount
) => {
  cart.products.push({
    product: productId,
    quantity: 1,
    totalPrice: price,
    totalPriceAfterDiscount: priceAfterDiscount,
  });
  cart = this.updateCart(cart, price, priceAfterDiscount);
  return cart;
};
module.exports.handlePopProduct = (cart, productId) => {
  const productIndex = cart.products.findIndex(
    (obj) => obj.product._id == productId
  );
  const { totalPrice, totalPriceAfterDiscount, quantity } =
    cart.products[productIndex];
  cart = this.updateCart(
    cart,
    -totalPrice,
    -totalPriceAfterDiscount,
    -quantity,
    -1
  );
  cart.products.splice(productIndex, 1);
  return cart;
};
module.exports.handleIncrProductQuan = (
  cart,
  productId,
  price,
  priceAfterDiscount
) => {
  const productIndex = cart.products.findIndex(
    (obj) => obj.product._id == productId
  );
  cart.products[productIndex].totalPrice += price;
  cart.products[productIndex].quantity += 1;
  cart.products[productIndex].totalPriceAfterDiscount += priceAfterDiscount;
  cart = this.updateCart(cart, price, priceAfterDiscount, 1, 0);
  return cart;
};
module.exports.handleDecrProductQuan = (
  cart,
  productId,
  price,
  priceAfterDiscount
) => {
  const productIndex = cart.products.findIndex(
    (obj) => obj.product._id == productId
  );
  const product = cart.products[productIndex];
  if (product.quantity === 1) {
    cart.products.splice(productId, 1);
    cart = this.updateCart(cart, -price, -priceAfterDiscount, -1, -1);
    return cart;
  }
  product.totalPrice -= price;
  product.totalPriceAfterDiscount -= priceAfterDiscount;
  product.quantity -= 1;
  cart = this.updateCart(cart, -price, -priceAfterDiscount, -1, 0);
  return cart;
};
