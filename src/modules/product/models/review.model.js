import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema(
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
      require: true,
      trim: true,
      unique: true,
    },

    image: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "image",
    },
  },
  {
    timestamps: true,
  }
);

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
