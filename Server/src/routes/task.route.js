import express from "express";
import task from "../controllers/task.controller.js";
import verifytoken from "../middleware/auth.middleware.js";
const Taskroute = express.Router();

Taskroute.post("/add", verifytoken, task.Add);
Taskroute.get("/get", verifytoken, task.Get);
Taskroute.put("/update/:_id", verifytoken, task.Update);
Taskroute.delete("/delete/:_id", verifytoken, task.Delete);

export default Taskroute;
