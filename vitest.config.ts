import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    exclude: ["tests-e2e", "node_modules"],
    coverage: {
      provider: "v8", // or "c8"
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      exclude: [
        "**/test-utils/**",
        "**/*.d.ts",
        "vite.config.ts",
        "vitest.config.ts",
        "eslint.config.js",
      ],
    },
  },
});
