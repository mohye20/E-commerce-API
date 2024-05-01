import { catchError } from "../../../utils/errorHandler.js";
import userModel from "../models/user.model.js";

export const getWhishlist = catchError(async (req, res, next) => {
  const { whishlist } = await userModel.findById(req.user.id);
  res.status(200).json({ whishlist });
});

export const updateWhishlish = catchError(async (req, res, next) => {
  const { product_id } = req.body;
  const user = await userModel.findById(req.user.id);
  const indexOfProduct = user.whishlist.findIndex(
    ({ _id }) => _id.toString() === product_id
  );
  if (indexOfProduct === -1) {
    user.whishlist.push(product_id), await user.save();
  } else {
    user.whishlist.splice(indexOfProduct, 1), await user.save();
  }
  res.status(200).json({ message: "Whishlist Updated Sucess" });
});
