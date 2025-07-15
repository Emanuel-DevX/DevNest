"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <footer className="text-center py-8 border-t border-gray-700 text-gray-400">
      © {new Date().getFullYear()} DevNest. All rights reserved. 
      <div>
        Built by <a className=" text-teal-200" href="https://emanuelmolla.dev">Emanuel Molla</a>
      </div>
    </footer>
  );
}
