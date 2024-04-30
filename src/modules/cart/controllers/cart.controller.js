import AppError, { catchError } from "../../../utils/errorHandler.js";
import cartModel from "../models/cart.model.js";

export const getCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOne({ user_id: req.user.id });
  res.json({ cart });
});

export const addToCart = catchError(async (req, res, next) => {
  const { product_id } = req.body;
  const cart = await cartModel.findOne({ user_id: req.user.id });
  const prtocutEntry = cart.products.find((entry) => {
    return entry.product_id._id.toString() === product_id;
  });

  console.log(prtocutEntry);
  if (!prtocutEntry) {
    cart.products.push({ product_id, quantity: 1 });
  } else {
    prtocutEntry.quantity++;
  }

  await cart.save();
  res.json({ message: "Added Successfuly" });
});

export const deleteFromCart = catchError(async (req, res, next) => {
  const { product_id } = req.body;
  const cart = await cartModel.findOne({ user_id: req.user.id });
  const prtocutEntry = cart.products.find((entry) => {
    return entry.product_id._id.toString() === product_id;
  });
  if (!prtocutEntry) {
    throw new AppError("Product not found", 404);
  } else {
    prtocutEntry.quantity -= 1;
  }

  if (prtocutEntry.quantity === 0) {
    cart.products.remove(prtocutEntry);
  }

  await cart.save();
  res.json({ message: "Deleted Successfuly" });
});
