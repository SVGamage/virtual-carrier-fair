"use server";
import { registerUserFormType } from "@/components/DetailsRegisterForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { $Enums } from "@prisma/client";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import UserType = $Enums.UserType;

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

export const getUserOnDB = async (userId: string) => {
  return prisma.user.findUnique({
    where: { userId },
  });
};

export async function customNavigate(path: string) {
  redirect(path);
}

export async function postLogin(dbUser: any) {
  if (dbUser && dbUser.user_type === UserType.EMPLOYEE) {
    redirect("/employee-dashboard");
  }
  if (dbUser && dbUser.user_type === UserType.EMPLOYER) {
    redirect("/employer-dashboard");
  }
  redirect("/");
}
