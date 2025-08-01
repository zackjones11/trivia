import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["frontend/**/*.{ts,tsx}", "server/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      quotes: ["error", "single"],
      semi: ["error", "never"],
    },
  },
]);
