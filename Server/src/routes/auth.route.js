import express from "express";
import auth from "../controllers/auth.controller.js";

const Userauthroute = express.Router();

// Endpoints for login and registration
Userauthroute.post("/login", auth.login);
Userauthroute.post("/register", auth.register);

export default Userauthroute;
