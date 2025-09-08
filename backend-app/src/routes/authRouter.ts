import express, { Router } from "express";
import { login, signup } from "../controllers/authController";

const authRouter: Router = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);

authRouter.get("/logout", login);

export default authRouter;
