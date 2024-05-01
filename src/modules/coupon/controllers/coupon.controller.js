import AppError, { catchError } from "../../../utils/errorHandler.js";
import couponModel from "../models/coupon.model.js";

export const getAllCoupons = catchError(async (req, res, next) => {});
export const addCoupon = catchError(async (req, res, next) => {
  const coupon = await couponModel.create(req.body);
  res.status(201).json({ coupon });
});

export const getCoupon = catchError(async (req, res, next) => {
  const { couponId } = req.params;
  const coupon = await couponModel.findById(couponId);
  if (coupon) return res.status(200).json({ coupon });
  throw new AppError("Coupon not found", 404);
});
export const deleteCoupon = catchError(async (req, res, next) => {
  const { couponId } = req.params;
  const deletedCoupon = await couponModel.findByIdAndDelete(couponId);
  if (deletedCoupon)
    return res.status(200).json({ message: "Coupon Deleted successfully" });

  throw new AppError("Coupon Not Found", 404);
});

export const updateCoupon = catchError(async (req, res, next) => {
  const { couponId } = req.params;
  const coupon = await couponModel.findByIdAndUpdate(couponId, req.body);
  if (coupon)
    return res.status(200).json({ message: "Coupon updated successfully" });
  throw new AppError("Coupon Not Found", 404);
});
