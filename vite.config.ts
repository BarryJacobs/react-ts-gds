/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"]
  }
})
