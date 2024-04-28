import joi from "joi";
export const addCategorySchema = joi.object({
  body: {
    name: joi.string().min(3).max(200).trim().required(),
    image: joi.object(),
  },
  query: {},
  params: {},
  file: joi.object().required(),
});

export const upadteCategorySchema = joi.object({
  body: { name: joi.string().min(3).max(200).trim(), image: joi.object() },
  query: {},
  params: { categorySlug: joi.string().required() },
  file: joi.object(),
});

export const deleteCategorySchema = joi.object({
  body: {},
  query: {},
  params: { categorySlug: joi.string().required() },
});
