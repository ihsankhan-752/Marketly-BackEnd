import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  userSignUp,
  userLogin,
} from "../../controllers/auth/auth.controller.js";
import {
  loginSchema,
  signUpSchema,
} from "../../validations/auth.validation.js";
const router = express.Router();

router.post("/register", validate(signUpSchema), userSignUp);
router.post("/login", validate(loginSchema), userLogin);

export default router;
