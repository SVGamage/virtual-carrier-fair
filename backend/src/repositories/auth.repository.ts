import { Prisma, PrismaClient } from "@prisma/client";
import {
  getUserFilter,
  getUserParams,
  paramsType,
  UserSignUpData,
} from "../utils/auth.types";
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

export const getUser = async (filter: getUserFilter) => {
  const prisma = await createConnection();
  let params: getUserParams = {};
  if (filter.id !== undefined) {
    params.id = filter.id;
  }
  if (filter.email !== undefined) {
    params.email = filter.email;
  }
  if (filter.username !== undefined) {
    params.username = filter.username;
  }
  return prisma.user.findFirst({
    where: params,
  });
};

export const updateTempOTP = async (email: string, tempOTP: number | null) => {
  const prisma = await createConnection();
  let params: paramsType = {};
  if (tempOTP === null) {
    params.verified = true;
  }
  params.tempOTP = tempOTP;
  return prisma.user.update({
    where: {
      email,
    },
    data: params,
  });
};
