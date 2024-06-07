import type { Request, Response } from "express";
import * as authServices from "../services/auth.service";
import {
  SignUpReqBody,
  verifyOTPReqBody,
  verifyOTPReqQuery,
} from "../utils/auth.types";
import bcrypt from "bcrypt";
import { UserSignUpValidationSchema } from "../utils/zod.validations";
import { sendMail, transporter } from "../configs/nodemailer-config";
import { generateOTP } from "../utils/helper.functions";
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
