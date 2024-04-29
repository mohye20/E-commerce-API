import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
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
      required: true,
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
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

productSchema.pre(/update/i, function (next) {
  if (this._update.name)
    this._update.slug = slugify(this._update.name, { lower: true });
  next();
});

productSchema.pre(/find/, function (next) {
  this.populate("cover_image");
  next();
});

productSchema.virtual("images", {
  ref: "image_product",
  localField: "_id",
  foreignField: "product_id",
});

productSchema.pre(/find/, function (next) {
  this.populate("images", ["-product_id", "image_id"]);
  next();
});

productSchema.pre(/delete/i, async function (next) {
  const toBeDeleteProduct = await productModel.findOne(this._conditions);
  if (!toBeDeleteProduct) return next();
  await mongoose.model("image").findOneAndDelete(toBeDeleteProduct.cover_image);
  next();
});

productSchema.pre(/delete/, async function (next) {
  const toBeDeleteProduct = await productModel.findOne(this._conditions);
  if (!toBeDeleteProduct) return next();
  await Promise.all(
    toBeDeleteProduct.images.map(async (image) => {
      await mongoose.model("image").findByIdAndDelete(image.image_id);
      await mongoose.model("image_product").findByIdAndDelete(image._id);
    })
  );

  next();
});

productSchema.pre(/update/i, async function (next) {
  if (!this._update.cover_image) return next();
  const toBeUpdatedProduct = await productModel.findOne(this._conditions);
  if (!toBeUpdatedProduct) return next();
  await mongoose
    .model("image")
    .findByIdAndDelete(toBeUpdatedProduct.cover_image);
  next();
});

// productSchema.pre(/update/i, async function (next) {
//   const toBeUpdatedProduct = await productModel.findOne(this._conditions);
//   if (!toBeUpdatedProduct) return next();
//   await Promise.all(
//     toBeUpdatedProduct.images.map(async (image) => {
//       await mongoose.model("image").findByIdAndDelete(image.image_id);
//       await mongoose.model("image_product").findByIdAndDelete(image._id);
//     })
//   );
//   next();
// });
const productModel = mongoose.model("product", productSchema);

export default productModel;
