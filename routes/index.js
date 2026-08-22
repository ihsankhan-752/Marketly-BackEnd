import express from "express";
import userAuthRouter from "./auth/auth.route.js";
const router = express.Router();

router.use("/user/auth", userAuthRouter);

export default router;
