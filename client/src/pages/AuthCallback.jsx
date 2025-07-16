"use client";
import { useEffect } from "react";
import { handleAuthCallbackFromURL } from "../lib/auth";

export default function AuthCallback() {
  useEffect(() => {
    handleAuthCallbackFromURL();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-white text-lg">Signing you in...</p>
    </div>
  );
}
