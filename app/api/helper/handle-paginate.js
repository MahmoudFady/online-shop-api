module.exports = (reqQuery, total) => {
  let { pageIndex, limit } = reqQuery;
  pageIndex = +pageIndex || 1;
  limit = +limit || 10;
  const skip = (pageIndex - 1) * limit;
  const maxPageIndex = Math.ceil(total / limit);
  const last = maxPageIndex === pageIndex;
  const hasPaginate = total > limit;
  return {
    pageIndex,
    limit,
    skip,
    maxPageIndex,
    last,
    hasPaginate,
    total,
  };
};
