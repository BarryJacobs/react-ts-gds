import { defineConfig, UserConfig } from "vite"
import { viteStaticCopy, Target } from "vite-plugin-static-copy"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ command }): UserConfig => {
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
    server: {
      host: "0.0.0.0",
      port: 5173
    },
    test: {
      setupFiles: ["./setupTests.ts"],
      globals: true,
      environment: "jsdom",
      css: true,
      environmentOptions: {
        jsdom: {
          resources: "usable"
        }
      }
    }
  }

  return config
})
