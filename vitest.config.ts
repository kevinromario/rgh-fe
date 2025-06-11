import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8", // or "c8"
      reporter: ["text", "html"], // menampilkan di terminal dan folder HTML report
      reportsDirectory: "./coverage",
      exclude: ["**/test-utils/**", "**/*.d.ts"],
    },
  },
});
