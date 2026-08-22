import express from "express";
import { authMiddleware, isAdmin } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {createStoreValidation} from  "../../validations/store.validation.js";
import {createStoreType,getStoreTypes} from "../../controllers/store/storeType.controller.js";
import {} from "../../middlewares/auth.middleware.js"
const storeTypeRouter = express.Router();


storeTypeRouter.post("/store-type",authMiddleware,isAdmin,validate(createStoreValidation),createStoreType);
storeTypeRouter.get("/store-type",authMiddleware,getStoreTypes);


export default storeTypeRouter;
