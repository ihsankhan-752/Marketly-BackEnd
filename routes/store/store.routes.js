import express from "express";
import { isStoreOwner,authMiddleware } from "../../middlewares/auth.middleware.js";

const storeRouter = express.Router();



export default storeRouter;