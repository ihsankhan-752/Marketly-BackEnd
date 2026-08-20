import express from "express";
import {validate} from "../middlewares/validate.middleware.js"
import {userSignUp,userLogin} from "../controllers/auth.controller.js";

import { loginSchema, signUpSchema } from "../validations/auth.validation.js";
const authRouter = express.Router();

authRouter.post("/api/v1/auth",validate(signUpSchema),userSignUp);
authRouter.post("api/v1/auth",validate(loginSchema),userLogin);

export default authRouter;