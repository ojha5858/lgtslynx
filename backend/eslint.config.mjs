import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Backend-friendly rules
      "no-console": "off",
      "no-unused-vars": ["warn"],
      "consistent-return": "off",
      "no-underscore-dangle": "off",

      // Style handled by Prettier
      "max-len": "off",
    },
  },
];
