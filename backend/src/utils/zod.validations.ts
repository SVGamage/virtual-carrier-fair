import { z } from "zod";
import { createConnection } from "../configs/prisma-mongodb-connector";
import {
  isEmailExists,
  isUsernameExists,
} from "../repositories/auth.repository";

export const UserSignUpValidationSchema = z
  .object({
    fullname: z
      .string()
      .min(2, { message: "Fullname must be at least 2 characters long" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .refine(async (value) => !(await isUsernameExists(value)), {
        message: "Username already exists",
      }),
    email: z
      .string()
      .email()
      .refine(async (value) => !(await isEmailExists(value)), {
        message: "Email already exists",
      }),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
    user_type: z.enum(["CANDIDATE", "EMPLOYER"]),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
  });
