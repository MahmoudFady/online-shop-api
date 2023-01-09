const Product = require("../models/product");
module.exports.getAll = async (reqQuery) => {
  const total = await Product.count();
  const paginateOptions = getPaginateOptions(reqQuery, total);
  const { skip, limit } = paginateOptions;
  const products = await this.getByPaginate(skip, limit);
  return { products, paginateOptions };
};
const getPaginateOptions = require("../helper/handle-paginate");
module.exports.getByPaginate = (skip, limit, query = {}) => {
  return Product.find(query)
    .skip(skip)
    .limit(limit)
    .select("-id -images -stock");
};
module.exports.getById = (id) => {
  return Product.findById(id).select("-id");
};
module.exports.deleteById = (id) => {
  return Product.deleteById(id);
};
module.exports.updateById = (id, data) => {
  return Product.updateOne(
    { _id: id },
    {
      $set: data,
    }
  );
};
module.exports.getBySearch = (target) => {
  return Product.find({
    $or: [
      { brand: { $regex: target, $options: "i" } },
      { title: { $regex: target, $options: "i" } },
      { description: { $regex: target, $options: "i" } },
    ],
  }).select("-id -images -stock");
};

module.exports.getByCategory = async (reqQuery, category) => {
  const total = await Product.find({ category }).count();
  const paginateOptions = getPaginateOptions(reqQuery, total);
  const { skip, limit } = paginateOptions;
  const products = await this.getByPaginate(skip, limit, { category });
  return { paginateOptions, products };
};
module.exports.getByPriceRange = async (reqQuery) => {
  console.log("fired");
  let { minPrice, maxPrice } = reqQuery;
  minPrice = +minPrice || 1;
  maxPrice = +maxPrice || 2000;
  const total = await Product.find({
    price: { $gte: minPrice, $lte: maxPrice },
  }).count();
  const paginateOptions = getPaginateOptions(reqQuery, total);
  const { skip, limit } = paginateOptions;
  const products = await this.getByPaginate(skip, limit, {
    price: { $gte: minPrice, $lte: maxPrice },
  });
  return { paginateOptions, products };
};
