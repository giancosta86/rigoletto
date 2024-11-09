import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = {
  plugins: [tsconfigPaths()],

  test: {
    setupFiles: ["./src/matchers/all.ts", "static/jest-extended/index.js"],
    include: ["src/**/*.{test,spec}.ts"],

    watch: false,

    allowOnly: true,

    coverage: {
      exclude: [
        "*.js",
        "*.ts",
        "**/index.ts",
        "**/*.test.ts",
        "**/*.spec.ts",
        "dist/",
        "website/",
        "static/",
        "tests/"
      ]
    }
  }
};

export default defineConfig(config);
