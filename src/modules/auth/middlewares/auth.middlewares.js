import userSearch from "../../../utils/checkUser.js";
import AppError, { catchError } from "../../../utils/errorHandler.js";
import jwt from "jsonwebtoken";
export const authenticate = catchError(async (req, res, next) => {
  const token = req.header("token");

  if (!token || !token.startsWith("Bearer"))
    throw new AppError("Unauthorized", 401);

  const bearerToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(error.message, 498);
  }
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
