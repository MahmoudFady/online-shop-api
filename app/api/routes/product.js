const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
router.get("/", productController.getByQuery);
router.get("/:id", productController.getById);

module.exports = router;
