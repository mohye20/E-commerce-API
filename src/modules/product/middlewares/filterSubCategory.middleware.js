import { catchError } from "../../../utils/errorHandler.js";
import categoryModel from "../models/category.model.js";

export const filterSubCategories = () => {
  return catchError(async (req, res, next) => {
    const { categorySlug } = req.params;
    const category = await categoryModel.findOne({ slug: categorySlug });
    req.dbQuery = req.dbQuery.where({ category_id: category._id });
    next();
  });
};

export const attachCategoryId = () =>
  catchError(async (req, res, next) => {
    const { categorySlug } = req.params;
    const category = await categoryModel.findOne({ slug: categorySlug });
    req.body.category_id = category._id.toString();
    next();
  });
