const API_BASE = import.meta.env.VITE_PUBLIC_API_URL;

// Login: redirect to backend OAuth
export function login(redirectTo) {
  console.log(redirectTo);
  const target = redirectTo || "/dashboard";
  if (typeof window !== "undefined") {
    sessionStorage.setItem("post_login_redirect", target);

    if (isAuthenticated()) {
      console.log("User authenticated?");

      // window.location.href = "/dashboard/";
      window.location.replace(target || "/dashboard");

      return;
    }
    window.location.href = `${API_BASE}/auth/google`;
  }
}

// Logout: clear localStorage and go home
export function logout() {
  if (typeof window !== undefined) {
    localStorage.removeItem("devnest_token");
    localStorage.removeItem("devnest_user");
    window.location.href = "/";
  }
}
export function logoutAndLogin() {
  localStorage.removeItem("devnest_token");
  localStorage.removeItem("devnest_user");
  window.location.replace(`${API_BASE}/auth/google`);
}

// Handle auth callback (when backend redirects after OAuth)
export function handleAuthCallbackFromURL() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  const user = url.searchParams.get("user");
  if (token && user) {
    localStorage.setItem("devnest_token", token);
    localStorage.setItem("devnest_user", user);

    const target = sessionStorage.getItem("post_login_redirect");
    // sessionStorage.removeItem("post_login_redirect");
    window.location.replace(target ? target : "/dashboard");
    // window.location.href = "/dashboard";
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

export function saveCurrentUser(user) {
  if (typeof window === "undefined") return false;
  localStorage.setItem("devnest_user", JSON.stringify(user));
}
