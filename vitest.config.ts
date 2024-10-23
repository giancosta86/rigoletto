import { defineConfig, ViteUserConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const config: ViteUserConfig = {
  plugins: [tsconfigPaths()],

  test: {
    setupFiles: ["./src/matchers/all.ts", "jest-extended/index.js"],

    watch: false,

    coverage: {
      include: ["src/**/*"],
      exclude: ["**/index.ts", "**/*.test.ts", "**/*.spec.ts"]
    }
  }
};

config.test!.allowOnly = true;

export default defineConfig(config);
