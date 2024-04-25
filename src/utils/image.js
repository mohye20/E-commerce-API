import { v2 as cloudinary } from "cloudinary";
import { catchError } from "./errorHandler.js";

export const uploadImage = catchError(async (path) => {
  const { public_id: imageName, secure_url: imageUrl } =
    await cloudinary.uploader.upload(path);

  return { imageName, imageUrl };
});

export const deleteImage = catchError(async (imageName) => {
  await cloudinary.uploader.destroy(imageName);
});
