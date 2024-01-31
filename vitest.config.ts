/// <reference types="vitest" />

import { mergeConfig, defineConfig, UserConfig } from "vite"
import viteConfig from "./vite.config.ts"

export default mergeConfig<UserConfig, UserConfig>(
  viteConfig({ mode: "development", command: "serve" }),
  defineConfig({
    test: {
      setupFiles: ["./setupTests.ts"],
      globals: true,
      environment: "jsdom",
      css: true,
      coverage: {
        enabled: true,
        provider: "v8",
        reporter: ["text", "lcov"]
      },
      environmentOptions: {
        jsdom: {
          resources: "usable"
        }
      }
    }
  })
)
