const API_BASE = process.env.NEXT_PUBLIC_API_URL;
// Login: redirect to backend OAuth
export function login() {
  window.location.href = `${API_BASE}/auth/google`;
}

// Logout: clear localStorage and go home
export function logout() {
  localStorage.removeItem("devnest_token");
  localStorage.removeItem("devnest_user");
  window.location.href = "/";
}
