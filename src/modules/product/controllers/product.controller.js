import { catchError } from "../../../utils/errorHandler.js";
import imageModel from "../../image/models/image.model.js";
import { makeImage } from "../../image/utils/image.utils.js";
import imageOnProductModel from "../models/imageOneProduct.js";
import productModel from "../models/product.model.js";

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

export const updateProductWithImages = () =>
  catchError(async (req, res, next) => {
    if (req.files.images) {
      const product = await productModel.findOne({
        slug: req.params.productSlug,
      });

      await Promise.all(
        product.images.map(async (image) => {
          try {
            await imageOnProductModel.findByIdAndDelete(image._id);
            await imageModel.findByIdAndDelete(image.image_id);
          } catch (error) {
            return next(error);
          }
        })
      );

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
    }

    await req.dbQuery;
    return res.status(201).json({
      message: `updated Product With ${req.files.images || 0} images`,
    });
  });
