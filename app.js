import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(authRouter);




app.use(errorMiddleware);
export default app;