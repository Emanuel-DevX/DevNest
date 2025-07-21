/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        orbitron: ["Orbitron", "sans-serif"],
        space: ['"Space Grotesk"', "sans-serif"],
        jetbrains: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
