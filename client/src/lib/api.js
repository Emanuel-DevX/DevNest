const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;
import { getToken } from "./auth";

const fetcher = async (endpoint, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Fetch failed");
  }
  return res.json();
};

export default fetcher;
