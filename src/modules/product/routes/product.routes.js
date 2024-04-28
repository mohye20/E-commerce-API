import express from "express";
import {
  filterOne,
  filterQuery,
  paginateQuery,
  populateQuery,
  searchQuery,
  selectFiledsQuery,
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
import upload from "../../../middlewares/upload.js";
import { attachCoverImage } from "../middlewares/product.middleware.js";
import {
  addProductWithImages,
  updateProductWithImages,
} from "../controllers/product.controller.js";

const router = express.Router();

router
  .route("/")
  .get(
    attachFindQuery(productModel),
    paginateQuery(3),
    populateQuery("subcategory_id", ["-slug"]),
    sortQuery(),
    selectFiledsQuery(),
    searchQuery(["title", "description"]),
    filterQuery(),
    excuteQuery()
  )
  .post(
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),

    validate(addProductSchema),
    attachCoverImage(),
    attachAddQuery(productModel),
    addProductWithImages()
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
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validate(updateProductSchema),
    attachCoverImage(),
    attachUpdateQuery(productModel),
    filterOne({ filedName: "slug", paramName: "productSlug" }),
    updateProductWithImages()
  )
  .delete(
    validate(deleteProductSchema),
    attachDeleteQuery(productModel),
    excuteQuery()
  );

export default router;
