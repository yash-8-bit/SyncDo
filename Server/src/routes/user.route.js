import express from "express";
import verifytoken from "../middleware/auth.middleware.js";
import user from "../controllers/user.controller.js";

const Userroute = express.Router();

// Endpoints for  fetching and deleting tasks
Userroute.get("/details", verifytoken, user.Details);
Userroute.delete("/delete", verifytoken, user.Delete);

export default Userroute;
