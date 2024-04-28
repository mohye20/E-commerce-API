import AppError, { catchError } from "../../../utils/errorHandler.js";
import categoryModel from "../models/category.model.js";

const assertUniqueCategory = catchError(async (req, res, next) => {
  const { name } = req.body;
  const category = await categoryModel.findOne({ name });
  console.log(category);
  if (category) return new AppError("Category already exists", 400);
  next();
});

export default assertUniqueCategory;
