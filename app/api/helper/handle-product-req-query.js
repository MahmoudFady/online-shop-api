module.exports = (reqQuery) => {
  let { searchQ, minPrice, maxPrice, category } = reqQuery;
  let dataBaseQuery = {};
  if (searchQ) {
    const target = new RegExp(searchQ);
    dataBaseQuery = {
      $or: [
        { brand: { $regex: target, $options: "i" } },
        { title: { $regex: target, $options: "i" } },
        { description: { $regex: target, $options: "i" } },
      ],
    };
  } else if (minPrice || maxPrice) {
    minPrice = +minPrice || 1;
    maxPrice = +maxPrice || 2000;
    dataBaseQuery = { price: { $gte: minPrice, $lte: maxPrice } };
    console.log(dataBaseQuery);
  } else if (category) {
    dataBaseQuery = { category };
  }
  return dataBaseQuery;
};
