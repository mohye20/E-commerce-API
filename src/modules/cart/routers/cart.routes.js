import express from "express";
import {
  authenticate,
  authorize,
} from "../../auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enum.js";
import {
  addToCart,
  deleteFromCart,
  getCart,
} from "../controllers/cart.controller.js";
import { applyCoupon, assertCart } from "../middlewares/cart.midlleware.js";

const router = express.Router();

router.route("/").get(authenticate, authorize(ROLES.USER), assertCart, getCart);
router
  .route("/add")
  .put(authenticate, authorize(ROLES.USER), assertCart, addToCart);
router
  .route("/remove")
  .put(authenticate, authorize(ROLES.USER), assertCart, deleteFromCart);
router
  .route("/coupon")
  .put(authenticate, authorize(ROLES.USER), assertCart, applyCoupon);

export default router;
