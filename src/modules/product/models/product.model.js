import mongoose from "mongoose";
import { validate } from "uuid";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
    trim: true,
    unique: true,
  },

  slug: {
    type: String,
    unique: true,
    minLength: 2,
    maxLength: 100,
    trim: true,
  },
  description: {
    type: String,
    minLength: 2,
    maxLength: 1000,
    required: true,
    trim: true,
  },

  stock: {
    type: Number,
    min: 0,
    required: true,
  },

  price: {
    type: Number,
    min: 1,
    required: true,
  },

  discount_price: {
    type: Number,
    min: 1,
    required: true,
    validate: {
      validator: (value) => {
        return value <= this.price;
      },
      message: "The Discound Price Must be less than or equal to Price",
    },
  },

  cover_image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "image",
  },

  features: [
    {
      key: Stirng,
      value: Stirng,
    },
  ],
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
