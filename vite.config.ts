import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  appType: "spa",
  resolve: {
    alias: { "@/": path.join(__dirname, "src") },
  },
  server: {
    open: true,
    port: 3000,
    strictPort: true,
  },
  plugins: [react()],
});
