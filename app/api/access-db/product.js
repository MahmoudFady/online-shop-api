const Product = require("../models/product");
module.exports.getProductCountByQuery = async (query = {}) => {
  return await Product.find(query).count();
};
module.exports.getByPaginate = (skip, limit, query = {}) => {
  return Product.find(query)
    .skip(skip)
    .limit(limit)
    .select("-id -images -stock")
    .sort({ price: 1 });
};
module.exports.getById = (id) => {
  return Product.findById(id).select("-id");
};
