import AppError from "../utils/errorHandler.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      {
        ...(req.body && { body: req.body }),
        ...(req.query && { query: req.query }),
        ...(req.params && { params: req.params }),
        ...(req.file && { file: req.file }),
        ...(req.files && { files: req.files }),
      },
      { abortEarly: false }
    );

    if (error) {
      throw new AppError(
        error.details.map((d) => d.message.split("''").join("")),
        400
      );
    }

    next();
  };
};

export default validate;
