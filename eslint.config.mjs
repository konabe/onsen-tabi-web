import tsParser from "@typescript-eslint/parser";
import gitignore from "eslint-config-flat-gitignore";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import storybookPlugin from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "eslint.config.mjs",
    "**/setupTests.ts",
    "**/vite.config.ts",
    "**/vitest.config.ts",
    ".storybook/**",
    ".yarn/**",
    "**/storybook-static/**",
  ]),
  gitignore(),
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs["recommended-latest"],
  ...storybookPlugin.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
        warnOnUnsupportedTypeScriptVersion: true, // 最新バージョンで整合性がとれなくなったらfalseにする
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react-hooks/rules-of-hooks": "off", // Storybookでエラーが出るため
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-uses-react": "off", // React 17からimportが不要になったため
      "react/react-in-jsx-scope": "off", // React 17からimportが不要になったため
      "react/prop-types": "off", // TypeScriptで型定義しているため
    },
  },
  {
    // テストコードは no-explicit-any を無効化
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
