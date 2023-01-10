const productAccessDB = require("../access-db/product");
const getPaginateOptions = require("../helper/handle-paginate");
const handleProductReqQuery = require("../helper/handle-product-req-query");
module.exports.getByQuery = async (reqQuery) => {
  const dataBaseQuery = handleProductReqQuery(reqQuery);
  const count = await productAccessDB.getProductCountByQuery(dataBaseQuery);
  const paginateOptions = getPaginateOptions(reqQuery, count);
  const { skip, limit } = paginateOptions;
  const products = await productAccessDB.getByPaginate(
    skip,
    limit,
    dataBaseQuery
  );
  return { products, paginateOptions };
};
module.exports.getById = (id) => {
  return productAccessDB.getById(id);
};
