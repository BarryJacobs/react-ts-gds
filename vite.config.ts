/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { viteStaticCopy, Target } from "vite-plugin-static-copy"

export default defineConfig(({ command }) => {
  const copyTargets: Target[] = []
  if (command === "serve") {
    copyTargets.push({
      src: "src/data/mocks/**/*",
      dest: "/mocks"
    })
  }

  const config = {
    plugins: [
      react(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: copyTargets
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /^~(.*)$/,
          replacement: "$1"
        }
      ]
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./setupTests.ts"]
    }
  }

  return config
})
