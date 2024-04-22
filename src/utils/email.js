import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
});

const sendEmail = async (email, token, req) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Email verification",
    text: "Please validate you email address",
    html: `<a href="${req.protocol}://${req.headers.host}/api/v1/auth/verify-email/${token}">Click here to confirm your email address</a>`,
  });
};

export default sendEmail;
