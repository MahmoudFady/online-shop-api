const Product = require("../models/product");
module.exports.getAll = async (req, res, next) => {
  try {
    let { pageIndex, limit } = req.query;
    pageIndex = +pageIndex || 1;
    limit = +limit || 10;
    const skip = (pageIndex - 1) * limit;
    const total = await Product.count();
    const maxPageIndex = Math.ceil(total / limit);
    const last = maxPageIndex === pageIndex;
    const paginate = total > limit;
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .select("-id -images -stock");
    res.status(200).json({
      message: "get all products",
      total,
      maxPageIndex,
      limit: +limit,
      length: products.length,
      last,
      paginate,
      products,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports.search = async (req, res, next) => {
  try {
    const q = req.query.q;
    const regex = new RegExp(q);
    const products = await Product.find({
      $or: [
        { brand: { $regex: regex, $options: "i" } },
        { title: { $regex: regex, $options: "i" } },
        { description: { $regex: regex, $options: "i" } },
      ],
    }).select("-id -images -stock");
    console.log("after log db");
    res.status(200).json({
      message: "get products by search query",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).select("-id");
    res.status(200).json({ message: "get product by id", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getByCategory = async (req, res, next) => {
  try {
    let { pageIndex, limit } = req.query;
    pageIndex = +pageIndex || 1;
    limit = +limit || 10;
    const category = req.params.category;
    const skip = (pageIndex - 1) * limit;
    const total = await Product.find({ category }).count();
    const maxPageIndex = Math.ceil(total / limit);
    const paginate = total > limit;
    const last = pageIndex === maxPageIndex;
    const products = await Product.find({ category })
      .skip(skip)
      .limit(limit)
      .select("-id -images -stock");
    res.status(200).json({
      message: "get products by category",
      total,
      maxPageIndex,
      limit,
      paginate,
      length: products.length,
      last,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getByPriceRange = async (req, res, next) => {
  try {
    let { pageIndex, limit, minPrice, maxPrice } = req.query;
    pageIndex = +pageIndex || 1;
    limit = +limit || 20;
    minPrice = +minPrice || 1;
    maxPrice = +maxPrice || 2000;
    const skip = (pageIndex - 1) * limit;
    const total = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).count();
    const maxPageIndex = Math.ceil(total / limit);
    const paginate = total > limit;
    const last = pageIndex === maxPageIndex;
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .skip(skip)
      .limit(limit)
      .select("-id -images -stock");
    res.status(200).json({
      message: "get products by price range",
      total,
      maxPageIndex,
      limit,
      paginate,
      length: products.length,
      last,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
