import { request, Router } from "express";
import * as authControllers from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signup", authControllers.signUp);
// authRouter.post("/login", authControllers.login);
// /retry-send-otp?email=test@gmail.com need to get req.query
authRouter.post("/retry-send-otp", authControllers.retrySendOTP);
authRouter.post("/verify-otp", authControllers.verifyOTP);
