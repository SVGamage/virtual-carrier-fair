import { Prisma, PrismaClient } from "@prisma/client";
import { UserSignUpData } from "../utils/auth.types";
import { createConnection } from "../configs/prisma-mongodb-connector";

const prisma = new PrismaClient();

export const signUp = async (userData: UserSignUpData) => {
  const prisma = await createConnection();
  return prisma.user.create({
    data: userData,
  });
};

export const isUsernameExists = async (username: string) => {
  const prisma = await createConnection();
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user !== null;
};

export const isEmailExists = async (email: string) => {
  const prisma = await createConnection();
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user !== null;
};
