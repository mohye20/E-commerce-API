import express from "express";
import {
  filterOne,
  paginateQuery,
  populateQuery,
  sortQuery,
} from "../../../middlewares/featuer.middleware.js";
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
  .get(
    attachFindQuery(productModel),
    // paginateQuery(3),
    // populateQuery("subcategory_id", ["-slug"]),
    sortQuery(),
    excuteQuery()
  )
  .post(
    validate(addProductSchema),
    attachAddQuery(productModel),
    excuteQuery({ status: 201 })
  );

router
  .route("/:productSlug")
  .get(
    attachFindQuery(productModel),
    filterOne(
      { filedName: "slug", paramName: "productSlug" },
      (req, res, next) => {
        res.json(" filterOne Done");
      },
      excuteQuery()
    )
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
