import express from "express";
import Userauthroute from "./routes/auth.route.js";
import cors from "cors";
import "./config/dotenv.config.js";
import Userroute from "./routes/user.route.js";
import Taskroute from "./routes/task.route.js";
import Logsroute from "./routes/logs.route.js";

// Create an Express application instance
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

app.use(express.json());

app.use("/api/userauth", Userauthroute);
app.use("/api/user", Userroute);
app.use("/api/task", Taskroute);
app.use("/api/logs", Logsroute);

export default app;
