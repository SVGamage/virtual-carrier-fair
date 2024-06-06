import { request, Router } from "express";
import * as authControllers from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signup", authControllers.signUp);
