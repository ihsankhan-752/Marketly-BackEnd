import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  userSignUp,
  userLogin,
  adminSignUp,
} from "../../controllers/auth/auth.controller.js";
import {
  loginSchema,
  signUpSchema,
} from "../../validations/auth.validation.js";
import { authMiddleware, isAdmin } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", validate(signUpSchema), userSignUp);
router.post("/login", validate(loginSchema), userLogin);


router.post("/admin/register", authMiddleware,isAdmin,validate(signUpSchema), adminSignUp);
  router.post("/admin/login", validate(loginSchema), userLogin);




export default router;
