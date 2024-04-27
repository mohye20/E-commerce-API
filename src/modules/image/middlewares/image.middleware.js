import AppError, { catchError } from "../../../utils/errorHandler.js";
import imageModel from "../models/image.model.js";
import { makeImage } from "../utils/image.utils.js";

// export const attachImage = (bodyFiledName) =>
//   catchError(async (req, res, next) => {
//     if (!req.file) return next();
//     console.log(req.file);

//     const image = await makeImage(req.file.path);

//     req.body[bodyFiledName] = image._id;

//     next();
//   });

export const attachImage = (bodyFieldName) => {
  return catchError(async (req, res, next) => {
    if (!req.file) return new AppError("Error");

    const image = await makeImage(req.file.path);

    req.body[bodyFieldName] = image._id;
    console.log("image", image);
    console.log("file", req.file);

    next();
  });
};
