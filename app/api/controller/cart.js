const cartAccessDB = require("../access-db/cart");
const productAccessDB = require("../access-db/product");
module.exports.pushProduct = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const productId = req.params["productId"];
    const { price, discountPercentage } = await productAccessDB.getById(
      productId
    );
    const cart = await cartAccessDB.getByUserId(userId);
    if (cart) {
      const updatedCart = await cartAccessDB.pushProduct(
        cart,
        productId,
        price,
        discountPercentage
      );
      return res
        .status(200)
        .json({ message: "your cart updated", cart: updatedCart });
    }
    const createdCart = await cartAccessDB.createCart(
      userId,
      productId,
      price,
      discountPercentage
    );
    res.status(200).json({ message: "your cart created", cart: createdCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.popProduct = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const productId = req.params["productId"];
    let cart = await cartAccessDB.getByUserId(userId);
    cart = cartAccessDB.popProduct(cart, productId);
    if (cart.totalProducts === 0) {
      cart.remove();
      return res.status(200).json({ message: "cart deleted" });
    }
    cart.save();
    res.status(200).json({ message: "product removed form cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.increaseQuantity = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const productId = req.params["productId"];
    const { price, discountPercentage } = await productAccessDB.getById(
      productId
    );
    const cart = await cartAccessDB.increaseQuantity(
      userId,
      productId,
      price,
      discountPercentage
    );
    res.status(200).json({ message: "incease product quantity in cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.decreaseQuantity = async (decode, req, res, next) => {
  try {
    const userId = decode.userId;
    const productId = req.params.productId;
    let cart = await cartAccessDB.getByUserId(userId);
    cart = cartAccessDB.decreaseQuantity(cart, productId);
    if (cart.totalProducts === 0) {
      cart.remove();
      return res.status(200).json({ message: "cart deleted" });
    }
    await cart.save();
    res.status(200).json({ message: "product quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
