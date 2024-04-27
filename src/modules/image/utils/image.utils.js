import { catchError } from "../../../utils/errorHandler.js";
import { uploadImage } from "../../../utils/image.js";
import imageModel from "../models/image.model.js";

export const makeImage = async (path) => {
  const { imageName, imageUrl } = await uploadImage(path);
  console.log({ imageName, imageUrl });
  const image = await imageModel.create({
    name: imageName,
    path: imageUrl,
  });
  return image;
};
