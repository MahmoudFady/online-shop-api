module.exports.calcProductPrice = (price, discount) => {
  const priceAfterDiscount = price - price * (discount / 100);
  return Math.round(priceAfterDiscount);
};
