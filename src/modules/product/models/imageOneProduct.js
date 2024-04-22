import mongoose from "mongoose";

const imageOnProductSchema = new mongoose.Schema(
  {
    image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "images",
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const imageOnProductModel = mongoose.model(
  "image_product",
  imageOnProductSchema
);

export default imageOnProductModel;
