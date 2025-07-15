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

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
      >
        <img
          src={user.image}
          alt={user.name}
          className="w-6 h-6 rounded-full ring-2 ring-teal-500/50"
        />
        <span className="text-white font-bold text-lg">{user.name.split(" ")[0]}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-slate-700 rounded-lg shadow-xl z-50">
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
