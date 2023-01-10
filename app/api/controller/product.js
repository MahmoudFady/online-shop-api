const productUseCase = require("../use-case/product");
module.exports.getByQuery = async (req, res) => {
  try {
    const { products, paginateOptions } = await productUseCase.getByQuery(
      req.query
    );
    res.status(200).json({
      message: "get product",
      ...paginateOptions,
      products,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports.getById = async (req, res) => {
  try {
    const product = await productUseCase.getById(req.params.id);
    res.status(200).json({ message: "get product by id", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
