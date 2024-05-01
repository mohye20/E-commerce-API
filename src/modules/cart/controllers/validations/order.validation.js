import joi from "joi";
import schemas from "../../../../utils/schemas.js";
export const addOrderSchema = joi.object({
  body: {
    phone_number: schemas.phoneNumber.required(),
    address: joi.string().required().max(100),
  },
  params: {},
  query: {},
});

export const deleteCouponSchema = joi.object({
  body: { order_id: schemas.modelId.required() },
  params: {},
  query: {},
});
