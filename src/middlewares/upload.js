import multer from "multer";
import AppError from "../utils/errorHandler.js";
const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith("image")) {
    return cb(new AppError("Images Only", 400), false);
  }
  cb(null, true);
}

const upload = multer({ fileFilter, storage });
export default upload;
