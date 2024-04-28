import mongoose, { mongo } from "mongoose";
import { deleteImage } from "../../../utils/image.js";

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 500,
    },

    path: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

imageSchema.pre(/delete/i, async function (next) {
  const toBeDeletedImage = await imageModel.findOne(this._conditions);
  console.log(this._conditions, toBeDeletedImage);
  if (!toBeDeletedImage) return next();
  await deleteImage(toBeDeletedImage.name); //
  next(); //
});

const imageModel = mongoose.model("image", imageSchema);

export default imageModel;
