import express from "express";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import brandModel from "../models/brand.model.js";
import { excuteQuery } from "../../../handlers/excute.handler.js";
import upload from "../../../middlewares/upload.js";
import validate from "../../../middlewares/validation.middleware.js";
import {
  addBrandSchema,
  deleteBrandSchema,
  upadteBrandSchema,
} from "../validations/brand.validation.js";
import { attachImage } from "../../image/middlewares/image.middleware.js";
import { filterOne } from "../../../middlewares/featuer.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(attachFindQuery(brandModel), excuteQuery({ status: 200 }))
  .post(
    upload.single("logo"),
    validate(addBrandSchema),
    attachImage("logo"),
    attachAddQuery(brandModel),
    excuteQuery({ status: 201 })
  );

router
  .route("/:brandSlug")
  .get(
    attachFindQuery(brandModel),
    filterOne({ filedName: "slug", paramName: "brandSlug" }),
    excuteQuery({ status: 200 })
  )
  .put(
    upload.single("logo"),
    validate(upadteBrandSchema),
    attachImage("logo"),
    attachUpdateQuery(brandModel),
    filterOne({ filedName: "slug", paramName: "brandSlug" }),
    excuteQuery({ status: 200 })
  )
  .delete(
    validate(deleteBrandSchema),
    attachDeleteQuery(brandModel),
    filterOne({ filedName: "slug", paramName: "brandSlug" }),
    excuteQuery({ status: 200 })
  );

export default router;
