import type { Request, Response } from "express";
import * as authServices from "../services/auth.service";
import { SignUpReqBody } from "../utils/auth.types";
import bcrypt from "bcrypt";
import { UserSignUpValidationSchema } from "../utils/zod.validations";
import { ZodError } from "zod";

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
    const user = await authServices.signUp({
      password: hashedPassword,
      ...validatedUserData,
    });
    response.status(201).json(user);
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Internal Server Error" });
  }
};
