import express from "express";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import subCategoryModel from "../models/subCategory.mode.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import validate from "../../../middlewares/validation.middleware.js";
import {
  addSubCategorySchema,
  deleteSubCategorySchema,
  upadteSubCategorySchema,
} from "../validations/subCategoy.validation.js";
import { assertCategoryId } from "../middlewares/assertCategoryId.midlleware.js";
import {
  attachCategoryId,
  filterSubCategories,
} from "../middlewares/filterSubCategory.middleware.js";
import { filterOne } from "../../../middlewares/featuer.middleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(attachFindQuery(subCategoryModel), excuteQuery())
  .post(
    attachCategoryId(),
    validate(addSubCategorySchema),
    assertCategoryId,
    attachAddQuery(subCategoryModel),
    excuteQuery(201)
  );

router
  .route("/:subCategorySlug")
  .get(
    attachFindQuery(subCategoryModel),
    filterOne({ filedName: "slug", paramName: "subCategorySlug" }),
    filterSubCategories(),
    excuteQuery()
  )
  .put(
    attachUpdateQuery(subCategoryModel),
    validate(upadteSubCategorySchema),
    filterOne({ filedName: "slug", paramName: "subCategorySlug" }),
    excuteQuery()
  )
  .delete(
    attachDeleteQuery(subCategoryModel),
    validate(deleteSubCategorySchema),
    filterOne({ filedName: "slug", paramName: "subCategorySlug" }),
    filterSubCategories(),

    excuteQuery()
  );

export default router;
