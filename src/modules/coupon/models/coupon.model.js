import mongoose, { mongo } from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
    trim: true,
    unique: true,
  },
  expirydate: {
    type: Date,
    required: true,
  },

  discount: {
    type: Number,
    required: true,
  },
});

const couponModel = mongoose.model("coupon", couponSchema);

export default couponModel;
