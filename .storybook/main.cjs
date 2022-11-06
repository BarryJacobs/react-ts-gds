const viteTsconfig = require("vite-tsconfig-paths")
const tsconfigPaths = viteTsconfig.default

const { mergeConfig } = require("vite")

const path = require("path")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  core: { builder: "@storybook/builder-vite" },
  staticDirs: ["../public"],
  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  features: {
    previewMdx2: true,
    storyStoreV7: true
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()]
    })
  }
}
