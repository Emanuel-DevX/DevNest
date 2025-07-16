export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    "react/react-in-jsx-scope": "off", // not needed with modern React
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
