import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserOnDB, postLogin } from "@/action/actions";
import { redirect } from "next/navigation";

export default async function PostLogin() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const dbUser = await getUserOnDB(user.id);
  await postLogin(dbUser);
}
