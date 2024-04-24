import mongoose from "mongoose";
import slugify from "slugify";

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
      validator: function (value) {
        return value <= this.price;
      },
      message: "The Discound Price Must be less than or equal to Price",
    },
  },

  cover_image: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "image",
  },

  features: [
    {
      key: String,
      value: String,
    },
  ],

  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    required: true,
  },
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
