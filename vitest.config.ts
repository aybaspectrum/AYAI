import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    exclude: [
      "e2e/**",
      "tests-examples/**",
      "tests/**",
      "**/node_modules/**",
    ],
  },
});
