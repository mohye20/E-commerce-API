import joi from "joi";

export const addProductSchema = joi.object({
  body: {
    title: joi.string().min(2).max(200).trim().required(),
    description: joi.string().min(2).max(200).trim().required(),
    stock: joi.number().min(0).required(),
    price: joi.number().min(0.01).required(),
    discount_price: joi.number().min(0.01).required(),
    feature: joi.array().items(
      joi.object().keys({
        key: joi.string().required(),
        vlaue: joi.string().required(),
      })
    ),
    subcategory_id: joi.string().length(24).hex().required(),
  },
  query: {},
  params: {},
});

export const updateProductSchema = joi.object({
  body: {
    title: joi.string().min(3).max(200).trim(),
    description: joi.string().min(3).max(10000).trim(),
    stock: joi.number().min(0),
    price: joi.number().min(0.01),
    discount_price: joi.number().min(0.01),
    features: joi.array().items(
      joi.object().keys({
        key: joi.string().required(),
        value: joi.string().required(),
      })
    ),
    subcategory_id: joi.string().hex().length(24),
  },
  params: { productSlug: joi.string().required() },
  query: {},
});

export const deleteProductSchema = joi.object({
  body: {},
  params: { productSlug: joi.string().required() },
  query: {},
});
