"use client";

import { useState, useEffect } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { login, logout, isAuthenticated, getCurrentUser } from "@/lib/auth";

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true); // add loading

  useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated()) {
      const currentUser = getCurrentUser();
      if (currentUser) setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  if (loading) return null;
  if (!user) {
    return (
      <button
        onClick={() => {
          console.log("Get Started button clicked");
          login();
        }}
        className="group relative px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
      >
        Get Started
      </button>
    );
  }

//   if (!isAuthenticated()) {
//     return (
//       <button
//         onClick={login}
//         className="group relative px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
//       >
//         <svg className="w-5 h-5" viewBox="0 0 24 24">
//           <path
//             fill="currentColor"
//             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//           />
//           <path
//             fill="currentColor"
//             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//           />
//           <path
//             fill="currentColor"
//             d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//           />
//           <path
//             fill="currentColor"
//             d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//           />
//         </svg>
//         Get Started
//       </button>
//     );
//   }
//   if (!user) return null; // Wait until user loads

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
      >
        <img
          src={user.image}
          alt={user.name}
          className="w-8 h-8 rounded-full ring-2 ring-teal-500/50"
        />
        <span className="text-white font-medium">{user.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-150 flex items-center gap-3">
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-150 flex items-center gap-3">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          {/* Logout */}
          <div className="py-2 border-t border-slate-700">
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors duration-150 flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
