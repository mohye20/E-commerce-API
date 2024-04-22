import userModel from "../modules/user/models/user.model.js";
import mongoose from "mongoose";

const userSearch = async (param) => {
  let user;
  if (mongoose.Types.ObjectId.isValid(param)) {
    user = await userModel
      .findOne({ _id: param })
      .select("password name email _id role");
  } else {
    user = await userModel.findOne({
      $or: [{ name: param }, { email: param }],
    });
  }

  return user;
};

export default userSearch;
