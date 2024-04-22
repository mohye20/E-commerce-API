import bcrypt from "bcrypt";

const hashingPassword = (pass) => {
  const password = bcrypt.hashSync(pass, +process.env.SALT_ROUND);
  return password;
};

export const checkPassword = (password, userPassword) => {
  const match = bcrypt.compareSync(password, userPassword);
  return match;
};

export default hashingPassword;
