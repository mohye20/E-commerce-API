import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 200,
      require: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      minLength: 3,
      maxLength: 200,
      trim: true,
      unique: true,
    },

    image: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "image",
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

categorySchema.pre("updateMany", function (next) {
  if (this._update.name)
    this._update.slug = slugify(this._update.name, { lower: true });
  next();
});

categorySchema.pre(/find/, function (next) {
  this.populate("image", ["path"]);
  next();
});
const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
