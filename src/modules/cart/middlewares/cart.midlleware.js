import AppError, { catchError } from "../../../utils/errorHandler.js";
import couponModel from "../../coupon/models/coupon.model.js";
import cartModel from "../models/cart.model.js";

export const assertCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOne({ user_id: req.user.id });
  if (cart) return next();
  await cartModel.create({ user_id: req.user.id, products: [] });
  next();
});

export const applyCoupon = catchError(async (req, res, next) => {
  const { code } = req.body;
  const cart = await cartModel.findOne({ user_id: req.user.id });
  if (!code) {
    cart.coupon_id = null;
    await cart.save();
    return res.json({ message: "Coupon Removed successfully" });
  }

  const coupon = await couponModel.findOne({
    code,
    expirydate: { $gte: Date.now() },
  });

  if (!coupon) throw new AppError("Invalid coupon", 400);
  cart.coupon_id = coupon._id;
  await cart.save();

  res.json({ message: "Coupon added successfully" });
});
