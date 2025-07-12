import express from "express";
import auth from "../controllers/auth.controller.js";

const Userauthroute = express.Router();

Userauthroute.post("/login", auth.login);
Userauthroute.post("/register", auth.register);

export default Userauthroute;
