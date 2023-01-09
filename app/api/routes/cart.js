const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");
const checkAuth = require("../middlewares/check-auth");
router.post("/:productId", checkAuth, cartController.pushProduct);
router.delete("/:productId", checkAuth, cartController.popProduct);
router.patch(
  "/increaseQuantity/:productId",
  checkAuth,
  cartController.increaseQuantity
);
router.delete(
  "/decreaseQuantity/:productId",
  checkAuth,
  cartController.decreaseQuantity
);
module.exports = router;
