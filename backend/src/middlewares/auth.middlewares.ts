import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { refreshToken } from "../controllers/auth.controller";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const verifyUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = request.cookies.accessToken;
    if (!accessToken) {
      response.status(401).json({ message: "Unauthorized" });
      return;
    }
    jwt.verify(
      accessToken,
      SECRET_KEY,
      (error: jwt.VerifyErrors | null, decoded: any) => {
        if (error !== null) {
          if (error.name === "TokenExpiredError") {
            refreshToken(request, response);
          }
        } else {
          next();
        }
      },
    );
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};
