const API_BASE =import.meta.env.VITE_PUBLIC_API_URL;
// Login: redirect to backend OAuth
export function login() {
  if (isAuthenticated()) {
    console.log("User authenticated?");

    window.location.href = "/dashboard/";
    return;
  }
  window.location.href = `${API_BASE}/auth/google`;
}

// Logout: clear localStorage and go home
export function logout() {
  if (typeof window !== undefined) {
    localStorage.removeItem("devnest_token");
    localStorage.removeItem("devnest_user");
    window.location.href = "/";
  }
}

// Handle auth callback (when backend redirects after OAuth)
export function handleAuthCallbackFromURL() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  const user = url.searchParams.get("user");
  if (token && user) {
    localStorage.setItem("devnest_token", token);
    localStorage.setItem("devnest_user", user);
    window.location.href = "/dashboard";
  } else {
    alert("Login failed.");
    window.location.href = "/";
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("devnest_token");
}

// Get current user (parsed JSON)
export function getCurrentUser() {
  if (typeof window === "undefined") return false;

  const user = localStorage.getItem("devnest_user");
  return user ? JSON.parse(user) : null;
}

// Get token
export function getToken() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("devnest_token");
}
