import joi from "joi";
export const addCategorySchema = joi.object({
  body: { name: joi.string().min(3).max(200).trim().required() },
  query: {},
  params: {},
});

export const upadteCategorySchema = joi.object({
  body: { name: joi.string().min(3).max(200).trim() },
  query: {},
  params: { categorySlug: joi.string().required() },
});

export const deleteCategorySchema = joi.object({
  body: {},
  query: {},
  params: { categorySlug: joi.string().required() },
});
