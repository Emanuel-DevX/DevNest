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
