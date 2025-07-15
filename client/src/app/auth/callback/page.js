"use client";
import { useEffect } from "react";
import { handleAuthCallback } from "@/lib/auth";
import { useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const params = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      handleAuthCallback(code);
    }
  }, [params]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Signing you in...</p>
    </div>
  );
}
