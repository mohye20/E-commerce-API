import joi from "joi";
import schemas from "../../../utils/schemas.js";
export const addCouponSchema = joi.object({
  body: {
    code: joi.string().min(3).max(200).trim().required(),
    expirydate: joi.date().required(),
    discount: joi.number().required(),
  },
  params: {},
  query: {},
});
export const updateCouponSchema = joi.object({
  body: {
    code: joi.string().min(3).max(200).trim(),
    expirydate: joi.date(),
    discount: joi.number(),
  },
  params: { couponId: schemas.modelId.required() },
  query: {},
});
export const getCouponSchema = joi.object({
  body: {},
  params: { couponId: schemas.modelId.required() },
  query: {},
});

export const deleteCouponSchema = joi.object({
  body: {},
  params: { couponId: schemas.modelId.required() },
  query: {},
});
