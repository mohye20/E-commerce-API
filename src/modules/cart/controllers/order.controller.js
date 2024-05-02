import AppError, { catchError } from "../../../utils/errorHandler.js";
import {
  StripePaymentService,
  payOnline,
} from "../../../utils/onlinePayment.js";
import productModel from "../../product/models/product.model.js";
import userModel from "../../user/models/user.model.js";
import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";

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
