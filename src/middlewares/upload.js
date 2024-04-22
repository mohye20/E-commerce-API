import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import AppError from "../utils/errorHandler.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4(file) + " " + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    throw new AppError("Images Only", 400);
  }
  cb(null, false);
}

const upload = multer({ storage, fileFilter });

export default upload;
