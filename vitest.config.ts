import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["lcov"],
      exclude: [
        "**/*.stories.ts",
        ".storybook/**/*",
        ".yarn/**/*",
        "**/*.stories.tsx",
      ],
    },
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./setupTests.ts"],
    include: ["src/test/**/*.spec.{js,ts,jsx,tsx}"],
    alias: {
      "@/": path.resolve(__dirname, "src"),
    },
    retry: 3,
    reporters: ["default", "vitest-sonar-reporter"],
    outputFile: "coverage/sonar-report.xml",
  },
});
