import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
      id: user._id,
      name: user.name,
    },
    process.env.SECRET_KEY
  );
  return token;
};

export const decodeAuthToken = async (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
