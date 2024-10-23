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
 *  setupFiles: ["@giancosta86/rigoletto/matchers/node.js"]
 * }
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
