import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_STRING)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.error("Error connecting to DB", err.message);
    });
};

export default dbConnection;
