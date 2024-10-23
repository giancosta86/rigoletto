/** @type {import('typedoc').TypeDocOptions} */
export default {
  entryPoints: [
    "src/matchers/all.ts",
    "src/matchers/nodejs.ts",
    "src/matchers/vanilla.ts",
    "src/testing/index.ts"
  ],
  out: "website",
  includeVersion: true,
  excludePrivate: true,
  excludeProtected: false,
  treatWarningsAsErrors: true
};
