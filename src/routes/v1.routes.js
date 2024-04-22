import express from "express";
import authRouter from "../modules/auth/routes/auth.routes.js";
import categoryRouter from "../modules/product/routes/category.routes.js";
import subCategoryRouter from "../modules/product/routes/subCategory.routes.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/subcategory", subCategoryRouter);
export default router;
