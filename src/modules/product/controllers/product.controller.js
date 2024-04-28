import { catchError } from "../../../utils/errorHandler.js";
import { makeImage } from "../../image/utils/image.utils.js";
import imageOnProductModel from "../models/imageOneProduct.js";

export const addProductWithImages = () =>
  catchError(async (req, res, next) => {
    const product = await req.dbQuery;
    await Promise.all(
      req.files.images.map(async (file) => {
        try {
          const image = await makeImage(file.path);
          await imageOnProductModel.create({
            image_id: image._id,
            product_id: product._id,
          });
        } catch (error) {
          return next(error);
        }
      })
    );

    return res.status(201).json({
      message: `Added Product With ${req.files.images.length} images`,
    });
  });
