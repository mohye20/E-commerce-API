import AppError, { catchError } from "../../../utils/errorHandler.js";
import {
  StripePaymentService,
  payOnline,
} from "../../../utils/onlinePayment.js";
import productModel from "../../product/models/product.model.js";
import userModel from "../../user/models/user.model.js";
import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";
import createInvoice from "../../../utils/pdf.js";
import { sendPDFByEmail } from "../../../utils/email.js";

export const makeCOD = catchError(async (req, res, next) => {
  const cart = await cartModel.findOne({ user_id: req.user.id });
  console.log();
  if (cart.products.length === 0) throw new AppError("No Items found", 404);

  cart.products.forEach((product) => {
    if (product.product_id.stock < product.quantity) {
      throw new AppError("Insufficient Stock", 400);
    }
  });
  const order = await orderModel.create({
    user_id: req.user.id,
    coupon: {
      discount: cart.coupon_id?.discount || 0,
    },
    products: cart.products.map(
      ({ product_id: { title, price, discount_price }, quantity }) => ({
        quantity,
        product: { title, price, discount_price },
      })
    ),

    ...req.body,
  });

  if (!order) throw new AppError("Order Falid ", 400);
  const bulkWriteOptions = cart.products.map(
    ({ product_id: { _id }, quantity }) => {
      return {
        updateOne: {
          filter: {
            _id,
          },
          update: {
            $inc: {
              stock: -quantity,
            },
          },
        },
      };
    }
  );
  await productModel.bulkWrite(bulkWriteOptions);
  await cartModel.deleteOne({ user_id: req.user.id });

  // make Invoice

  const invoice = {
    shipping: {
      name: req.user.name,
      address: req.body.address,
    },
    items: cart.products.map(
      ({ product_id: { title, description, discount_price }, quantity }) => ({
        item: title,
        description,
        quantity,
        amount: quantity * discount_price * 100,
      })
    ),

    subtotal: cart.total_Price * 100,
    paid: 0,
    invoice_nr: order._id,
  };

  console.log({ user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD });

  createInvoice(invoice, "invoice.pdf");
  console.log(req.user);
  // await transporter.sendMail({
  //   from: process.env.EMAIL,
  //   to: req.user.email,
  //   attachments: [{ filename: "invoice.pdf", content: pdfFile }],
  // });
  const pdfFilePath = "invoice.pdf";
  const recipientEmail = "recipient@example.com";
  sendPDFByEmail("invoice.pdf", req.user.email);

  res.json({ order });
});

export const makePaymentSession = catchError(async (req, res, next) => {
  const cart = await cartModel.findOne({ user_id: req.user.id });
  const stripePaymentService = StripePaymentService;
  const session = await payOnline(cart, req, stripePaymentService);
  res.json(session);
});

export const makeOnlineOrder = async (data) => {
  const { customer_email } = data;
  const user = await userModel.findOne({ email: customer_email });
  const cart = await cartModel.findOne({ user_id });
  const order = await orderModel.create({
    user_id: user._id,
    address: "Alex",
    coupon: {
      discount: cart.coupon_id?.discount || 0,
    },
    is_paid: true,
    products: cart.products.map(
      ({ product_id: { title, price, discount_price }, quantity }) => ({
        quantity,
        product: { title, price, discount_price },
      })
    ),
    phone_number: "",
  });
};
