import joi from "joi";

export const singupSchema = joi.object({
  body: {
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi
      .string()
      .required()
      .pattern(/^[A-Z]/),
    name: joi
      .string()
      .required()
      .max(100)
      .min(2)
      .message("Name Must be at least 2 characters"),
  },
  query: {},
  params: {},
});

export const signinScehma = joi.object({
  body: {
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi
      .string()
      .required()
      .pattern(/^[A-Z]/),
  },
  query: {},
  params: {},
});

export const verifyEmailSchema = joi.object({
  body: {},
  query: {},
  params: { tokne: joi.string().hex().length(24).required() },
});
