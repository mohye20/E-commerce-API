import { catchError } from "../../../utils/errorHandler.js";
import imageModel from "../models/image.model.js";

export const attachImage = () =>
  catchError(async (req, res, next) => {
    if (!req.file) return next();
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path
    );
    const image = await imageModel.create({
      name: public_id,
      path: secure_url,
    });

    req.body.image = image._id;
    next();
  });
