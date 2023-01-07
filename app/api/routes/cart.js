const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");
const checkAuth = require("../middlewares/check-auth");
router.post("/:productId", checkAuth, cartController.pushProduct);
router.patch(
  "/increaseQuantity/:productId",
  checkAuth,
  cartController.increaseQuantity
);
router.patch(
  "/decreaseQuantity/:productId",
  checkAuth,
  cartController.decreaseQuantity
);
module.exports = router;
