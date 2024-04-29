import joi from "joi";

export const getReviewSchema = joi.object({
  body: {},
  params: { productSlug: joi.string().required() },
  query: {},
});

export const addReviewSchema = joi.object({
  body: {
    text: joi.string().min(3).max(20000).trim().required(),
    rating: joi.number().valid(1, 2, 3, 4, 5).required(),
  },

  params: { productSlug: joi.string().required() },
  query: {},
});

export const updateReviewSchema = joi.object({
  body: {
    text: joi.string().min(3).max(20000).trim(),
    rating: joi.number().valid(1, 2, 3, 4, 5),
  },

  params: { productSlug: joi.string().required() },
  query: {},
});

export const deleteReviewSchema = joi.object({
  body: {},
  params: { productSlug: joi.string().required() },
  query: {},
});
