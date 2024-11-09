import "vitest";
import { expect } from "vitest";

import { toExistInFileSystem } from "./toExistInFileSystem.js";

expect.extend({
  toExistInFileSystem
});

/**
 * Gallery of matchers based on NodeJS.
 *
 * To install them at runtime, you'll need this reference in Vitest's configuration file:
 *
 * ```
 * test: {
 *  setupFiles: ["@giancosta86/rigoletto/matchers/nodejs"]
 * }
 * ```
 *
 * To access them via TypeScript, just add this line to some global `.d.ts` file included by **tsconfig.json**:
 *
 * ```
 * import "@giancosta86/rigoletto/matchers/nodejs";
 * ```
 */
export interface NodeJsMatchers {
  /**
   * Asserts that a path exists in the file system.
   *
   * @group Matchers
   *
   * @example
   *
   * ```
   * expect("/etc/passwd").toExistInFileSystem()
   * ```
   */
  toExistInFileSystem: () => void;
}

declare module "vitest" {
  interface Assertion<T = any> extends NodeJsMatchers {}
  interface AsymmetricMatchersContaining extends NodeJsMatchers {}
}
