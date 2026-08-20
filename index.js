import app from "./app.js";
import "dotenv/config";
import { connectDB } from "./db/index.js";
import dns from "node:dns";
const PORT = process.env.PORT || 8000;

// Not working without it in my pc
dns.setServers(["8.8.8.8", "8.8.4.4"]);
await connectDB().then(()=>{
app.listen(PORT, () => {
  console.log("Server is Up and Running...");
});
}).catch((e)=>{
  console.log("faild to connect");
});



