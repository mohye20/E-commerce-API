import mongoose from "mongoose";

const productOnCartSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },

    quintity: {
      type: Number,
      required: true,
      min: 1,
      max: 10000,
    },
  },
  {
    timestamps: true,
  }
);

const productOnCartModel = mongoose.model("productOnCart", productOnCartSchema);

export default productOnCartModel;
