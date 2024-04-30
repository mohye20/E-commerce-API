import express from "express";
import {
  authenticate,
  authorize,
} from "../../auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enum.js";
import {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "../controllers/coupon.controller.js";
import validate from "../../../middlewares/validation.middleware.js";
import {
  addCouponSchema,
  deleteCouponSchema,
  getCouponSchema,
  updateCouponSchema,
} from "../validations/coupon.validation.js";
import { attachFindQuery } from "../../../middlewares/query.middleware.js";
import couponModel from "../models/coupon.model.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import {
  filterQuery,
  paginateQuery,
} from "../../../middlewares/featuer.middleware.js";

const router = express.Router();
router
  .route("/")
  .get(
    authenticate,
    authorize(ROLES.ADMIN),
    attachFindQuery(couponModel),
    paginateQuery(10),
    filterQuery(),
    excuteQuery({ status: 200 })
  )
  .post(
    authenticate,
    authorize(ROLES.ADMIN),
    validate(addCouponSchema),
    addCoupon
  );
router
  .route("/:couponId")
  .get(
    authenticate,
    authorize(ROLES.ADMIN),
    validate(getCouponSchema),
    getCoupon
  )
  .put(
    authenticate,
    authorize(ROLES.ADMIN),
    validate(updateCouponSchema),
    updateCoupon
  )
  .delete(
    authenticate,
    authorize(ROLES.ADMIN),
    validate(deleteCouponSchema),
    deleteCoupon
  );
export default router;
