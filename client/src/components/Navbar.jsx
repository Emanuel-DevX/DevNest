"use client";

import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-gray-950">
      <div className="text-xl font-bold text-white">
        <span className="text-blue-400">Dev</span>Nest
      </div>

      {pathname === "/" ? (
        <a
          href="/dashboard"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Get Started
        </a>
      ) : (
        <AuthButton />
      )}
    </nav>
  );
}
