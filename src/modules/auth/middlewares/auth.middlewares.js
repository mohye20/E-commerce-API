import userSearch from "../../../utils/checkUser.js";
import AppError, { catchError } from "../../../utils/errorHandler.js";
import { decodeAuthToken } from "../../../utils/token.js";

export const authenticate = catchError(async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    throw new AppError("Unizirthed", 401);
  }
  const decoded = await decodeAuthToken(token).catch((error) => {
    throw new AppError(error.message, 498);
  });

  req.user = decoded;
  next();
});

export const authorize = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};

export const assertUniqueEmail = catchError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userSearch(email);
  if (user) {
    throw new AppError("this User  Exist", 400);
  }

  next();
});
