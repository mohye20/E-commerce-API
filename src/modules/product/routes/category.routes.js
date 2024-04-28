import express from "express";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import categoryModel from "../models/category.model.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import { filterOne } from "../../../middlewares/featuer.middleware.js";
import validate from "../../../middlewares/validation.middleware.js";
import {
  deleteCategorySchema,
  addCategorySchema,
  upadteCategorySchema,
} from "../validations/category.validation.js";

import subCategoryRouter from "./subCategory.routes.js";
import upload from "../../../middlewares/upload.js";
import { attachImage } from "../../image/middlewares/image.middleware.js";
import assertUniqueCategory from "../middlewares/assertCategoryUnique.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(attachFindQuery(categoryModel), excuteQuery({ status: 200 }))
  .post(
    upload.single("image"),
    validate(addCategorySchema),
    attachImage("image"),
    attachAddQuery(categoryModel),
    excuteQuery({ status: 201 })
  );

router
  .route("/:categorySlug")
  .get(
    attachFindQuery(categoryModel),
    filterOne({ filedName: "slug", paramName: "categorySlug" }),
    excuteQuery(200)
  )
  .put(
    upload.single("image"),
    attachImage("image"),
    validate(upadteCategorySchema),
    attachUpdateQuery(categoryModel),
    filterOne({ filedName: "slug", paramName: "categorySlug" }),
    excuteQuery()
  )
  .delete(
    validate(deleteCategorySchema),
    attachDeleteQuery(categoryModel),
    filterOne({ filedName: "slug", paramName: "categorySlug" }),
    excuteQuery()
  );

router.use("/:categorySlug/subcategory", subCategoryRouter);
export default router;
