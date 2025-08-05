import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path"

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
