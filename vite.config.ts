/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { codecovVitePlugin } from "@codecov/vite-plugin";
import path from "path";

export default defineConfig({
  appType: "spa",
  plugins: [
    react(), // Put the Codecov vite plugin after all other plugins
    codecovVitePlugin({
      enableBundleAnalysis: process.env.VITE_CODECOV_TOKEN !== undefined,
      bundleName: "main",
      uploadToken: process.env.VITE_CODECOV_TOKEN,
    }),
  ],
  resolve: {
    alias: { "@/": path.join(__dirname, "src") },
  },
  server: {
    open: true,
    port: 3000,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./setupTests.ts"],
    include: ["src/test/**/*.spec.{js,ts,jsx,tsx}"],
    alias: {
      "@/": path.resolve(__dirname, "src"),
    },
  },
});
