"use client";
import { useEffect } from "react";
import { handleAuthCallbackFromURL } from "../lib/auth";

export default function AuthCallback() {
  useEffect(() => {
    handleAuthCallbackFromURL();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white w-full">
      {/* Spinner */}
      <div className="w-16 h-16 mb-6 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Message */}
      <p className="text-3xl font-semibold tracking-wide text-teal-200 animate-pulse">
        Signing you in...
      </p>
    </div>
  );
}
