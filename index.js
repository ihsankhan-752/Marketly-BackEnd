import express from "express";
import "dotenv/config";
import dns from "node:dns";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import router from "./routes/index.js";
import { connectDB } from "./db/index.js";

// Local DNS workaround — remove if not needed on other machines
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is Up and Running...");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err.message);
    process.exit(1);
  });