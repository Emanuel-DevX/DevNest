const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;
import { getToken,  logoutAndLogin } from "./auth";

const fetcher = async (endpoint, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (
      errorData.code === "TOKEN_EXPIRED" ||
      errorData.code === "TOKEN_INVALID"
    )
      logoutAndLogin();
    throw new Error(errorData.message || "Fetch failed");
  }
  return res.json();
};

export default fetcher;
