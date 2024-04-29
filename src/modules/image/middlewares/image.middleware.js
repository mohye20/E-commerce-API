import AppError, { catchError } from "../../../utils/errorHandler.js";
import { makeImage } from "../utils/image.utils.js";

export const attachImage = (bodyFieldName) => {
  return catchError(async (req, res, next) => {
    if (!req.file) return next();

    const image = await makeImage(req.file.path);
    req[bodyFieldName] = image;
    req.body[bodyFieldName] = image._id;
    next();
  });
};
