export const filterOne = ({ filedName, paramName }) => {
  return (req, res, next) => {
    req.dbQuery = req.dbQuery.where({ [filedName]: req.params[paramName] });
    next();
  };
};

export const paginateQuery =
  (pageSize = 5) =>
  (req, res, next) => {
    let { page } = +req.query || 1;
    if (page < 1) {
      page = 1;
    }

    req.dbQuery = req.dbQuery.skip((page - 1) * pageSize).limt(pageSize);

    next();
  };
