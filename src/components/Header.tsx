import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between py-3 px-5 h-14">
      <h1 className="font-bold text-blue-600 text-xl">Virtual Carrier Fair</h1>
      <nav className="flex gap-2">
        <Link
          className="bg-blue-600 py-4 px-3.5 flex justify-center items-center text-white font-bold border-solid border-2 border-blue-600 rounded-3xl"
          href={"/login"}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;
