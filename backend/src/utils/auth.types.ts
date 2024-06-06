import type { UserType } from "@prisma/client";

export type UserSignUpData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  user_type: UserType;
};

export type SignUpReqBody = UserSignUpData & { confirm_password: string };
