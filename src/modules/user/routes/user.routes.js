import express from "express";
import { attachFindQuery } from "../../../middlewares/query.middleware.js";
import userModel from "../models/user.model.js";
import { paginateQuery } from "../../../middlewares/featuer.middleware.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import {
  assertUniqueEmail,
  authenticate,
  authorize,
} from "../../auth/middlewares/auth.middlewares.js";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { ROLES } from "../../../utils/enum.js";
import validate from "../../../middlewares/validation.middleware.js";
import { updateWhishlistSchema } from "../validations/whishlist.validation.js";
import {
  getWhishlist,
  updateWhishlish,
} from "../controllers/whishlist.controller.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, authorize(ROLES.USER), getUser)
  .put(assertUniqueEmail, authenticate, authorize(ROLES.USER), updateUser);

router
  .route("/all")
  .get(
    authenticate,
    authorize(ROLES.ADMIN),
    attachFindQuery(userModel),
    paginateQuery(10),
    excuteQuery({ status: 200 })
  );

router
  .route("/whishlist")
  .get(authenticate, authorize(ROLES.USER), getWhishlist)
  .put(
    authenticate,
    authorize(ROLES.USER),
    validate(updateWhishlistSchema),
    updateWhishlish
  );
export default router;
