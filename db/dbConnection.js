import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/E-commerce")
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.error("Error connecting to DB", err.message);
    });
};

export default dbConnection;
