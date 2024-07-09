import DetailsRegisterForm from "@/components/DetailsRegisterForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
type Props = {
  params: {
    user_type: string;
  };
};
export default async function RegisterUserDetails({ params }: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const dbUser = await prisma.user.findUnique({ where: { userId: user.id } });
  if (dbUser) {
    redirect("/"); //redirect to home page if user already exists
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <DetailsRegisterForm user_type={params.user_type} />
    </div>
  );
}
