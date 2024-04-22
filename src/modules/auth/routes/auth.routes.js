import express from "express";
import * as authController from "../controllers/auth.controllers.js";
import { assertUniqueEmail } from "../middlewares/auth.middlewares.js";
import {
  singupSchema,
  verifyEmailSchema,
} from "../validation/auth.validation.js";
import validate from "../../../../src/middlewares/validation.middleware.js";
const router = express.Router();

router.post(
  "/signup",
  validate(singupSchema),
  assertUniqueEmail,
  authController.signUp
);
router.post("/signin", authController.signIn);
router.get(
  "/verify-email",
  validate(verifyEmailSchema),
  authController.verifyEmail
);
export default router;
