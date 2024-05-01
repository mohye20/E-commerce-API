import AppError from "./errorHandler.js";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define a payment service abstraction
const PaymentService = {
  createPaymentSession: async (cart, req) => {
    throw new AppError("createPaymentSession method not implemented", 400);
  },
};

// Implement the Stripe payment service using the Stripe library
export const StripePaymentService = {
  createPaymentSession: async (cart, req) => {
    console.log(req.user);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "EGP",
            unit_amount: cart.total_Price * 100,
            product_data: {
              name: req.user.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://github.com/mohye20/E-commerce-API",
      cancel_url: "https://github.com/mohye20/E-commerce-API",
      client_reference_id: cart._id.toString(),
      customer_email: req.user.email,
    });
    return session;
  },
};

// Modify payOnline to accept a payment service implementation
export const payOnline = async (cart, req, paymentService) => {
  return await paymentService.createPaymentSession(cart, req);
};
