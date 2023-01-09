const Product = require("../models/product");
const getPaginateOptions = require("../helper/handle-paginate");
const getProductsCount = async (query = {}) => {
  return await Product.find(query).count();
};
const getByPaginate = (skip, limit, query = {}) => {
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
module.exports.getAll = async (reqQuery) => {
  const total = await getProductsCount();
  const paginateOptions = getPaginateOptions(reqQuery, total);
  const { skip, limit } = paginateOptions;
  const products = await getByPaginate(skip, limit);
  return { products, paginateOptions };
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
  const total = await getProductsCount({ category });
  const paginateOptions = getPaginateOptions(reqQuery, total);
  const { skip, limit } = paginateOptions;
  const products = await getByPaginate(skip, limit, { category });
  return { paginateOptions, products };
};
module.exports.getByPriceRange = async (reqQuery) => {
  let { minPrice, maxPrice } = reqQuery;
  minPrice = +minPrice || 1;
  maxPrice = +maxPrice || 2000;
  const total = await getProductsCount({
    price: { $gte: minPrice, $lte: maxPrice },
  });
  const paginateOptions = getPaginateOptions(reqQuery, total);
  const { skip, limit } = paginateOptions;
  const products = await getByPaginate(skip, limit, {
    price: { $gte: minPrice, $lte: maxPrice },
  });
  return { paginateOptions, products };
};
