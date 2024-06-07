import type { Request, Response } from "express";
import * as authServices from "../services/auth.service";
import {
  loginCredentials,
  SignUpReqBody,
  verifyOTPReqBody,
  verifyOTPReqQuery,
} from "../utils/auth.types";
import bcrypt from "bcrypt";
import { UserSignUpValidationSchema } from "../utils/zod.validations";
import { sendMail, transporter } from "../configs/nodemailer-config";
import { generateOTP } from "../utils/helper.functions";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;
import { User } from "@prisma/client";

export const signUp = async (
  request: Request<{}, {}, SignUpReqBody>,
  response: Response,
) => {
  try {
    try {
      await UserSignUpValidationSchema.parseAsync(request.body);
    } catch (error) {
      // @ts-ignore
      response.status(400).json({ message: error?.issues[0]?.message });
      return;
    }
    const { confirm_password, password, ...validatedUserData } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const tempOTP = generateOTP();

    await sendMail(
      transporter,
      validatedUserData.email,
      validatedUserData.fullname,
      tempOTP,
    );

    const user: User = await authServices.signUp({
      password: hashedPassword,
      ...validatedUserData,
      tempOTP,
    });
    response.status(201).json({ id: user.id, ...validatedUserData });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};

export const retrySendOTP = async (
  request: Request<{}, {}, {}, verifyOTPReqQuery>,
  response: Response,
) => {
  try {
    const email = request.query.email;
    const user: User | null = await authServices.getUser({ email });
    if (user === null) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    const tempOTP = generateOTP();
    await sendMail(transporter, email, user.fullname, tempOTP);
    await authServices.updateTempOTP(email, tempOTP);
    response.status(200).json({ message: "OTP sent" });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};
export const verifyOTP = async (
  request: Request<{}, {}, verifyOTPReqBody, verifyOTPReqQuery>,
  response: Response,
) => {
  try {
    const email = request.query.email;
    const user = await authServices.getUser({ email });
    if (user === null) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    const tempOTP = parseInt(request.body.tempOTP);
    if (tempOTP !== user.tempOTP) {
      response.status(400).json({ message: "Invalid OTP" });
      return;
    }
    await authServices.updateTempOTP(email, null);
    response.status(200).json({ message: "OTP is verified" });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};

export const login = async (
  request: Request<{}, {}, loginCredentials>,
  response: Response,
) => {
  try {
    const { email, password } = request.body;
    const user = await authServices.getUser({ email });

    if (user !== null && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            userType: user.user_type,
          },
        },
        SECRET_KEY,
        { expiresIn: 60 },
      );
      const refreshToken = jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            userType: user.user_type,
          },
        },
        SECRET_KEY,
        { expiresIn: "7d" },
      );

      if (request.cookies.accessToken !== null) {
        request.cookies.accessToken = "";
      }
      if (request.cookies.refreshToken !== null) {
        request.cookies.refreshToken = "";
      }

      response
        .cookie("accessToken", accessToken, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true,
          sameSite: "lax",
        })
        .cookie("refreshToken", refreshToken, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true,
          sameSite: "lax",
        })
        .status(200)
        .json({ message: "Login Successfully." });
    } else {
      response.status(401).json({ message: "Authentication Failed." });
    }
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};

export const refreshToken = async (request: Request, response: Response) => {
  try {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      response.status(401).json({ message: "Unauthorized" });
      return;
    }
    jwt.verify(refreshToken, SECRET_KEY, (error: any, user: any) => {
      if (error) {
        response.status(403).json({ message: "Forbidden" });
        return;
      }
      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            userType: user.userType,
          },
        },
        SECRET_KEY,
        { expiresIn: 60 },
      );
      response
        .cookie("accessToken", accessToken, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true,
          sameSite: "lax",
        })
        .status(200)
        .json({ message: "Token Refreshed" });
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};

export const logout = async (request: Request, response: Response) => {
  try {
    response
      .clearCookie("accessToken", { httpOnly: true })
      .clearCookie("refreshToken", { httpOnly: true })
      .status(200)
      .json({ message: "Logout Successfully." });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};
export const verify = (request: Request, response: Response) => {
  response.status(200).json({ message: "User is verified" });
};
