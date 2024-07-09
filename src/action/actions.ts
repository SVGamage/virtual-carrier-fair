"use server";
import { registerUserFormType } from "@/components/DetailsRegisterForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { $Enums } from "@prisma/client";
import UserType = $Enums.UserType;
import prisma from "@/lib/db";

export const registerUserDetails = async (data: registerUserFormType) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return;
    }
    const dbUser = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      userId: user.id ?? "",
      user_type: data.isEmployer ? UserType.EMPLOYER : UserType.EMPLOYEE,
    };
    await prisma.user.create({ data: dbUser });
  } catch (e) {
    console.log("Error registering the user");
  }
};

export const isUsernameExists = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return !user;
};
