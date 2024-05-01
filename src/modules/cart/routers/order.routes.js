import express from "express";
import {
  authenticate,
  authorize,
} from "../../auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enum.js";

import { applyCoupon, assertCart } from "../middlewares/cart.midlleware.js";
import { attachFindQuery } from "../../../middlewares/query.middleware.js";
import orderModel from "../models/order.model.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import {
  filterId,
  paginateQuery,
} from "../../../middlewares/featuer.middleware.js";
import validate from "../../../middlewares/validation.middleware.js";
import { addOrderSchema } from "../controllers/validations/order.validation.js";
import { makeCOD } from "../controllers/order.controller.js";

const router = express.Router();

router
  .route("/")
  .get(
    authenticate,
    authorize(ROLES.USER),
    attachFindQuery(orderModel),
    filterId({ filedName: "user_id" }),
    paginateQuery(10),
    excuteQuery({ status: 200 })
  );
router
  .route("/cash")
  .post(
    authenticate,
    authorize(ROLES.USER),
    validate(addOrderSchema),
    assertCart,
    makeCOD
  );
// router
//   .route("/card")
//   .put(authenticate, authorize(ROLES.USER), assertCart, makeOnlineSession);

export default router;
