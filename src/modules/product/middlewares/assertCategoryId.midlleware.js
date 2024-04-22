import AppError, { catchError } from "../../../utils/errorHandler.js";
import categoryModel from "../models/category.model.js";

export const assertCategoryId = catchError(async (req, res, next) => {
  const { category_id } = req.body;
  const category = await categoryModel.findById(category_id);
  if (!category) {
    throw new AppError("this Category Not Exist", 400);
  }

  next();
});
