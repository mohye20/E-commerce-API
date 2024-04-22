export const filterOne = ({ filedName, paramName }) => {
  return (req, res, next) => {
    req.dbQuery = req.dbQuery.where({ [filedName]: req.params[paramName] });
    next();
  };
};
