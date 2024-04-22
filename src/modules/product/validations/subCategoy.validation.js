import joi from "joi";
export const addSubCategorySchema = joi.object({
  body: {
    name: joi.string().min(3).max(200).trim().required(),
    category_id: joi.string().hex().length(24).required(),
  },
  query: {},
  params: { categorySlug: joi.string().required() },
});

export const upadteSubCategorySchema = joi.object({
  body: { name: joi.string().min(3).max(200).trim() },
  query: {},
  params: {
    categorySlug: joi.string().required(),
    subCategorySlug: joi.string().required(),
  },
});

export const deleteSubCategorySchema = joi.object({
  body: {},
  query: {},
  params: {
    categorySlug: joi.string().required(),
    subCategorySlug: joi.string().required(),
  },
});
