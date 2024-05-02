import AppError, { catchError } from "../../../utils/errorHandler.js";
import hashingPassword, {
  checkPassword,
} from "../../../utils/hashingPassword.js";
import userSearch from "../../../utils/checkUser.js";
import { generateAuthToken } from "../../../utils/token.js";
import userModel from "../../user/models/user.model.js";
// import sendEmail from "../../../utils/email.js";

export const signUp = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password: hashingPassword(password),
  });

  // sendEmail(email, generateAuthToken(user), req);

  res.status(201).json({
    message: "User created successfully",
  });
});
export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userSearch(email);

  if (!user) {
    throw new AppError("User not found", 404);
  }
  const match = checkPassword(password, user.password);

  if (!match) {
    throw new AppError("Password Incorrect", 400);
  }
  const token = generateAuthToken(user);
  res.status(200).json({ message: "Login Success", token });
});

export const verifyEmail = catchError(async (req, res, next) => {
  const { token } = req.params;
  const { email } = decodeAuthToken(token);
  await userModel.findOneAndUpdate({ email }, { email_Verify: true });
  res.json({ message: "Email verified successfully" });
});
