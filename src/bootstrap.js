import dotenv from "dotenv";
import dbConnection from "../db/dbConnection.js";
import AppError, { globalErrorHandler } from "./utils/errorHandler.js";
import v1Router from "./routes/v1.routes.js";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
const bootstrap = (app, express) => {
  dotenv.config();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  app.use(express.json());
  dbConnection();

  app.use(morgan("dev"));
  app.use("/api/v1", v1Router);

  app.all("*", () => {
    throw new AppError("This Route Doesn't Exist", 404);
  });

  app.use(globalErrorHandler);
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log("Server Running in Port " + port);
  });
};

export default bootstrap;
