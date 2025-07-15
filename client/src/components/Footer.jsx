"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <footer className="text-center py-8 border-t border-gray-700 bg-gray-950 text-gray-400">
      © {new Date().getFullYear()} DevNest. All rights reserved.
    </footer>
  );
}
