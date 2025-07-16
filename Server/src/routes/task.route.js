import express from "express";
import task from "../controllers/task.controller.js";
import verifytoken from "../middleware/auth.middleware.js";
import {verifyid,verifytitle }from "../middleware/validation.middleware.js";
const Taskroute = express.Router();

// Endpoints for adding, fetching, updating, and deleting tasks
Taskroute.post("/add", verifytoken,verifytitle, task.Add);
Taskroute.get("/getone/:_id", verifytoken, verifyid, task.Getone);
Taskroute.get("/get", verifytoken, task.Get);
Taskroute.put("/assign/:_id", verifytoken, verifyid, task.Assign);
Taskroute.put("/update/:_id", verifytoken,verifytitle, verifyid, task.Update);
Taskroute.put("/update-status/:_id", verifytoken, verifyid, task.Updatestatus);
Taskroute.delete("/delete/:_id", verifytoken, verifyid, task.Delete);

export default Taskroute;
