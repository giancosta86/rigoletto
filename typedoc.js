/** @type {import('typedoc').TypeDocOptions} */
export default {
  plugin: ["@giancosta86/typedoc-readonly"],
  entryPoints: [
    "src/core/index.ts",
    "src/creation/index.ts",
    "src/matchers/all.ts",
    "src/matchers/nodejs/index.ts",
    "src/matchers/vanilla/index.ts",
    "src/testing/index.ts"
  ],
  out: "website",
  includeVersion: true,
  excludePrivate: true,
  excludeProtected: false,
  treatWarningsAsErrors: true
};
