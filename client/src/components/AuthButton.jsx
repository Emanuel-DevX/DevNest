"use client";

import { useState } from "react";

export default function AuthButton() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // TEMP: Simulate login
    setUser({ name: "Kiya" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Login with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-300">{user.name}</span>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-400 hover:text-white"
      >
        Logout
      </button>
    </div>
  );
}
