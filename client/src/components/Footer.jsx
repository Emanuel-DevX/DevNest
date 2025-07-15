"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <footer className="text-center py-8 border-t border-gray-700 text-gray-400">
      © {new Date().getFullYear()} DevNest. All rights reserved.
      <div>
        Built by{" "}
        <a
          href="https://emanuelmolla.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 hover:text-teal-400 transition-colors duration-200 underline-offset-2 hover:underline"
        >
          Emanuel Molla
        </a>
      </div>
    </footer>
  );
}
