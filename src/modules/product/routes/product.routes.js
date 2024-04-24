import express from "express";
import { filterOne } from "../../../middlewares/featuer.middleware.js";
import productModel from "../models/product.model.js";
import validate from "../../../middlewares/validation.middleware.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import {
  addProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";

const router = express.Router();

router
  .route("/")
  .get(attachFindQuery(productModel), excuteQuery())
  .post(
    validate(addProductSchema),
    attachAddQuery(productModel),
    excuteQuery()
  );

router
  .route("/:productSlug")
  .get(
    attachFindQuery(productModel),
    filterOne({ filedName: "slug", paramName: "productSlug" }, excuteQuery())
  )
  .put(
    validate(updateProductSchema),
    attachUpdateQuery(productModel),
    filterOne({ filedName: "slug", paramName: "productSlug" }, excuteQuery())
  )
  .delete(
    validate(deleteProductSchema),
    attachDeleteQuery(productModel),
    excuteQuery()
  );

export default router;
