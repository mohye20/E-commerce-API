import dotenv from "dotenv";
import dbConnection from "../db/dbConnection.js";
import AppError, {
  catchError,
  globalErrorHandler,
} from "./utils/errorHandler.js";
import v1Router from "./routes/v1.routes.js";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import stripe from "stripe";
import { makeOnlineOrder } from "./modules/cart/controllers/order.controller.js";
const bootstrap = (app, express) => {
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    catchError(async (request, response) => {
      const sig = request.headers["stripe-signature"];

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          process.env.STRTIPE_WEBHOOK_SECRET_KEY
        );
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          const data = event.data.object;
          await makeOnlineOrder(data);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      response.send();
    })
  );

  dotenv.config();
  app.use(express.json());
  dbConnection();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.use(morgan("dev"));
  app.use("/api/v1", v1Router);

  app.all("*", () => {
    throw new AppError("This Route Doesn't Exist", 404);
  });

  app.use(globalErrorHandler);
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log("Server Running in Port " + port);
  });
};

export default bootstrap;
