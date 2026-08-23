import express from "express";
import userAuthRouter from "./auth/auth.route.js";
import storeTypeRouter from "./store/storeType.route.js";
const router = express.Router();

router.use("/user/auth", userAuthRouter);
router.use("/",storeTypeRouter);
export default router;
