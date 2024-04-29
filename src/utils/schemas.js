import joi from "joi";

const modelId = joi.string().hex().length(24);

const schemas = {
  modelId,
};

export default schemas;
