import express from "express";
import "dotenv/config";
import { connectDB } from "./db/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Test Route Working");
});

app.use(errorMiddleware);
app.listen(8000, () => {
  console.log("Server is Up and Running...");
});
