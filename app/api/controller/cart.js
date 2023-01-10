const cartUseCase = require("../use-case/cart");
module.exports.getByUserId = async (decode, req, res, next) => {
  const cart = await cartUseCase.getByUserId(decode.userId);
  res.status(200).json({ message: "get cart by user id", cart });
};
module.exports.pushProduct = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const { productId } = req.params;
    const { message, cart } = await cartUseCase.pushProduct(userId, productId);
    console.log(message);
    res.status(200).json({ message, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.popProduct = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const productId = req.params["productId"];
    const { message, cart } = await cartUseCase.popProduct(userId, productId);
    res.status(200).json({ message, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.increaseQuantity = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const productId = req.params["productId"];
    const { message, cart } = await cartUseCase.increaseProductQuantity(
      userId,
      productId
    );
    res.status(200).json({ message, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.decreaseQuantity = async (decode, req, res, next) => {
  try {
    const userId = decode.userId;
    const productId = req.params.productId;
    const { cart } = await cartUseCase.decreaseProductQuantity(
      userId,
      productId
    );
    res.status(200).json({ message: "product quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
