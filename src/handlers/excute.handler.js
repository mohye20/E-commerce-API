import { catchError } from "../utils/errorHandler.js";

export const excuteQuery = ({ status = 200 } = {}) => {
  return catchError(async (req, res, next) => {
    const message = await req.dbQuery;
    res.status(status).json({ message });
  });
};
