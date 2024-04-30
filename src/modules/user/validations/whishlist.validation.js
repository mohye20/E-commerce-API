import joi from "joi";
import schemas from "../../../utils/schemas.js";

export const updateWhishlistSchema = joi.object({
  body: {
    product_id: schemas.modelId.required(),
  },
  params: {},
  query: {},
});
