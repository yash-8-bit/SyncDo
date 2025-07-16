import express from "express";
import logs from "../controllers/logs.controller.js";

import verifytoken from "../middleware/auth.middleware.js";
const Logsroute = express.Router();

// Endpoints for fetching logs
Logsroute.get("/get", verifytoken, logs.Get);

export default Logsroute;
