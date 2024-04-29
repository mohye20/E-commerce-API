import AppError, { catchError } from "../../../utils/errorHandler.js";
import productModel from "../models/product.model.js";
import reviewModel from "../models/review.model.js";

export const addReview = catchError(async (req, res, next) => {
  const { productSlug } = req.params;
  const product = await productModel.findOne({ slug: productSlug });

  if (!product) throw new AppError("Invalid Product Slug", 404);

  const addedReview = await reviewModel.findOne({
    user_id: req.user.id,
    product_id: product._id,
  });

  if (addedReview) throw new AppError("Review Already Exists", 400);

  const review = await reviewModel.create({
    ...req.body,
    user_id: req.user.id,
    product_id: product._id,
  });

  res.json({ review });
});

export const updateReview = catchError(async (req, res, next) => {
  const { productSlug } = req.params;
  const product = await productModel.findOne({ slug: productSlug });
  if (!product) throw new AppError("Invalid Product Slug", 404);

  const review = await reviewModel.findOne({
    user_id: req.user.id,
    product_id: product._id,
  });

  if (!review) throw new AppError("Review dosen't exist", 404);
  const updated = await reviewModel.updateOne(review, req.body);

  res.json({ updated });
});

export const deleteReview = catchError(async (req, res, next) => {
  const { productSlug } = req.params;
  const product = await productModel.findOne({ slug: productSlug });
  if (!product) throw new AppError("Invalid Product Slug", 404);

  const review = await reviewModel.findOneAndDelete(
    {
      user_id: req.user.id,
      product_id: product._id,
    },
    req.body
  );

  if (!review) throw new AppError("Review dosen't exist", 404);

  res.json({ message: "Delete Review Sucessfully" });
});
