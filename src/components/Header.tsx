import React from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Header() {
  console.log("Header");
  return (
    <header className="flex justify-between py-3 px-5 h-14">
      <h1 className="font-bold text-blue-600 text-xl">Virtual Carrier Fair</h1>
      <nav className="flex gap-2">
        <LoginLink className="bg-blue-600 py-4 px-3.5 flex justify-center items-center text-white font-bold border-solid border-2 border-blue-600 rounded-3xl">
          Login
        </LoginLink>
      </nav>
    </header>
  );
}
