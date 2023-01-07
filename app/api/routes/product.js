const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
router.get("/", productController.getAll);
router.get("/search", productController.search);
router.get("/category/:category", productController.getByCategory);
router.get("/price", productController.getByPriceRange);
router.get("/:id", productController.getById);

module.exports = router;
