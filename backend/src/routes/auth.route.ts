import { request, Router } from "express";
import * as authControllers from "../controllers/auth.controller";
import { verifyUser } from "../middlewares/auth.middlewares";

export const authRouter = Router();

authRouter.post("/signup", authControllers.signUp);
// authRouter.post("/login", authControllers.login);
// /retry-send-otp?email=test@gmail.com need to get req.query
authRouter.post("/retry-send-otp", authControllers.retrySendOTP);
authRouter.post("/verify-otp", authControllers.verifyOTP);
authRouter.post("/login", authControllers.login);
authRouter.post("/verify-user", verifyUser, authControllers.verify);
authRouter.post("/logout", authControllers.logout);
