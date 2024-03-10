import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
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
