import joi from "joi";
export const addBrandSchema = joi.object({
  body: {
    name: joi.string().min(3).max(200).trim().required(),
    logo: joi.object(),
  },
  query: {},
  params: {},
  file: joi.object().required(),
});

export const upadteBrandSchema = joi.object({
  body: { name: joi.string().min(3).max(200).trim(), logo: joi.object() },
  query: {},
  params: { brandSlug: joi.string().required() },
  file: joi.object(),
});

export const deleteBrandSchema = joi.object({
  body: {},
  query: {},
  params: { brandSlug: joi.string().required() },
});
