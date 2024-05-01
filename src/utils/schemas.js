import joi from "joi";

const modelId = joi.string().hex().length(24);

const phoneNumber = joi
  .string()
  .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
const schemas = {
  modelId,
  phoneNumber,
};

export default schemas;
