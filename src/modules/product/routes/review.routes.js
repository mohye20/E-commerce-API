import express from "express";
import validate from "../../../middlewares/validation.middleware.js";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import reviewModel from "../models/review.model.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import {
  authenticate,
  authorize,
} from "../../auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enum.js";
import {
  addReviewSchema,
  deleteReviewSchema,
  getReviewSchema,
  updateReviewSchema,
} from "../validations/review.validation.js";

import {
  filterQuery,
  paginateQuery,
} from "../../../middlewares/featuer.middleware.js";
import {
  addReview,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    validate(getReviewSchema),
    attachFindQuery(reviewModel),
    paginateQuery(10),
    filterQuery(),
    excuteQuery({ status: 200 })
  )
  .post(
    authenticate,
    authorize(ROLES.USER),
    validate(addReviewSchema),
    addReview
  )
  .put(
    authenticate,
    authorize(ROLES.USER),
    validate(updateReviewSchema),
    updateReview
  )
  .delete(
    authenticate,
    authorize(ROLES.USER),
    validate(deleteReviewSchema),
    deleteReview
  );

export default router;
