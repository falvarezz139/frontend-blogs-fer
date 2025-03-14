module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "vitest-globals/env": true, // Permite las variables globales de Vitest
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:vitest-globals/recommended", // Agrega las reglas de Vitest
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: { version: "18.2" }, // Asegúrate de que estás utilizando la versión correcta de React
  },
  plugins: ["react-refresh", "vitest-globals"], // Agrega el plugin de Vitest
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "warn", // Si estás utilizando PropTypes
  },
};
