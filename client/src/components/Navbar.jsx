import { useLocation } from "react-router-dom";

import AuthButton from "./AuthButton";
import { login } from "../lib/auth";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky backdrop-blur-xl top-0 z-50 flex justify-between items-center px-2 py-4 transition-all duration-300 border-b border-teal-500/10">
      {/* Logo with Google Fonts */}
      <div className="flex items-center">
        <a href="/">
          <div className="text-2xl flex items-baseline">
            <span
              className={"font-orbitron  font-bold text-teal-400 tracking-wide"}
            >
              Dev
            </span>
            <span
              className={
                "font-mono font-extrabold  text-white ml-0.5 tracking-tight"
              }
            >
              Nest
            </span>
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full ml-1 animate-pulse self-center"></div>
          </div>
        </a>
      </div>

      {/* Navigation Actions */}

      <div className="flex items-center space-x-4">
        {location.pathname === "/" ? (
          <button
            onClick={() => {
              console.log("Homepage login clicked");
              login();
            }}
            className="group relative px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <span className="relative z-10">Get Started</span>
          </button>
        ) : (
          <AuthButton />
        )}
      </div>
    </nav>
  );
}
