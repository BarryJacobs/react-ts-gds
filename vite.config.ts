/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig(({ command }) => {
  const config = {
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
  }

  if (command === "serve") {
    config.plugins.push(
      viteStaticCopy({
        targets: [
          {
            src: "src/data/mocks/**/*",
            dest: "/mocks"
          }
        ]
      })
    )
  }

  return config
})
