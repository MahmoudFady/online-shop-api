const productAccessDB = require("../access-db/product");
module.exports.getAll = async (req, res) => {
  try {
    const { products, paginateOptions } = await productAccessDB.getAll(
      req.query
    );
    res.status(200).json({
      message: "get all products",
      ...paginateOptions,
      products,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports.search = async (req, res) => {
  try {
    const q = req.query.q;
    const regex = new RegExp(q);
    const products = await productAccessDB.getBySearch(regex);
    res.status(200).json({
      message: "get products by search query",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productAccessDB.getById(id);
    res.status(200).json({ message: "get product by id", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { products, paginateOptions } = await productAccessDB.getByCategory(
      req.query,
      category
    );
    res.status(200).json({
      message: "get products by category",
      ...paginateOptions,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getByPriceRange = async (req, res) => {
  try {
    const { products, paginateOptions } = await productAccessDB.getByPriceRange(
      req.query
    );
    res.status(200).json({
      message: "get products by price range",
      ...paginateOptions,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
