import mongoose from "mongoose";

const imageOnProductSchema = new mongoose.Schema(
  {
    image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "image",
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

imageOnProductSchema.pre(/find/, function (next) {
  this.populate("image_id");
  next();
});

imageOnProductSchema.pre(/delete/i, async function (next) {
  const toBeDeletedIOP = await imageOnProductModel.findOne(this._conditions);
  if (!toBeDeletedIOP) return next();
  await mongoose.model("image").findByIdAndDelete(toBeDeletedIOP._id);
});

const imageOnProductModel = mongoose.model(
  "image_product",
  imageOnProductSchema
);

export default imageOnProductModel;
