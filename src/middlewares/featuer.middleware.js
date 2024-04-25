export const filterOne = ({ filedName, paramName }) => {
  return (req, res, next) => {
    req.dbQuery = req.dbQuery.where({ [filedName]: req.params[paramName] });
    next();
  };
};

export const paginateQuery =
  (pageSize = 5) =>
  (req, res, next) => {
    let page = +req.query.page || 1;
    if (page < 1) {
      page = 1;
    }

    req.dbQuery = req.dbQuery.skip((page - 1) * pageSize).limit(pageSize);

    next();
  };

export const populateQuery = (filedName, options) => (req, res, next) => {
  req.dbQuery = req.dbQuery.populate(filedName, options);
  next();
};

export const sortQuery = () => (req, res, next) => {
  const { sort, dir = "asc" } = req.query;
  if (!sort) return next();
  req.dbQuery = req.dbQuery.sort({ [sort]: dir });
  next();
};
export const selectFiledsQuery = () => (req, res, next) => {
  const { fields } = req.query;
  if (!fields) return next();
  req.dbQuery = req.dbQuery.select(fields.split(","));
  next();
};
