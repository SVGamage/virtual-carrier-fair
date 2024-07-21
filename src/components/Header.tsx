import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import MobileSidebar from "@/components/MobileSidebar";
import ProfileMenu from "@/components/ProfileMenu";

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar />
      <div className="w-full flex-1">
        <h1 className="block font-bold text-blue-600 text-md md:hidden ">
          Virtual Carrier Fair
        </h1>
      </div>
      <nav className="flex items-center justify-center gap-2">
        <LoginLink className="bg-blue-600 py-1 px-3.5  text-white font-bold border-solid border-2 border-blue-600 rounded-3xl">
          Login
        </LoginLink>
        <ProfileMenu />
      </nav>
    </header>
  );
}
