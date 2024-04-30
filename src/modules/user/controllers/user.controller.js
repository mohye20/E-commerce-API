import { catchError } from "../../../utils/errorHandler.js";
import userModel from "../models/user.model.js";

export const updateUser = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Update User Sucssefully" });
});

export const getUser = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("name email ");
  res.status(200).json({ user });
});
