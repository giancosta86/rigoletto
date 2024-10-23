import { defineConfig, ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = {
  test: {
    setupFiles: [
      "@giancosta86/rigoletto/matchers/all",
      "@giancosta86/rigoletto/jest-extended"
    ],

    watch: false
  }
};

export default defineConfig(config);
