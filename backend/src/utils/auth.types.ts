import type { UserType } from "@prisma/client";

export type UserSignUpData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  user_type: UserType;
  tempOTP?: number;
};

export type SignUpReqBody = UserSignUpData & { confirm_password: string };

export type verifyOTPReqQuery = {
  email: string;
};

export type getUserFilter = {
  id?: string;
  email?: string;
  username?: string;
};

export type getUserParams = {
  id?: string;
  email?: string;
  username?: string;
};

export type verifyOTPReqBody = {
  tempOTP: string;
};

export type paramsType = {
  verified?: boolean;
  tempOTP?: number | null;
};

export type loginCredentials = {
  email: string;
  password: string;
};
