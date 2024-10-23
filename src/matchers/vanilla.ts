import "vitest";
import { expect } from "vitest";
import { toThrowClass } from "./toThrowClass.js";

expect.extend({
  toThrowClass
});

/**
 * Gallery of vanilla matchers - compatible with any language implementation.
 *
 * To install them at runtime, you'll need this reference in Vitest's configuration file:
 *
 * ```
 * test: {
 *  setupFiles: ["@giancosta86/rigoletto/matchers/vanilla.js"]
 * }
 * ```
 */
export interface VanillaMatchers {
  /**
   * Asserts that an error of the given class - or one of its subclasses - is thrown.
   *
   * @typeParam E The expected error class. You shouldn't pass it as a type argument - but as the first argument.
   *
   * @param expectedClass The name of the expected error class - also matched if one of its subclasses is thrown.
   *
   * @param predicate If specified, this predicate about the error must be `true` for the matcher to pass; if the error class is not matched, the predicate is just ignored because the matcher fails.
   *
   * @group Matchers
   *
   * @example
   *
   * ```
   * class TestError extends Error {
   *  constructor(readonly magicNumber: number) {
   *    super();
   *  }
   * }
   *
   * class AnotherError extends Error {}
   *
   * expect(() => {
   *  throw new TestError(90);
   * }).toThrowClass(TestError);
   *
   * expect(() => {
   *  throw new TestError(90);
   * }).not.toThrowClass(AnotherError);
   * ```
   *
   * The matcher can also take a second parameter - a *typed predicate* evaluating the error:
   *
   * ```
   * class TestError extends Error {
   *  constructor(readonly magicNumber: number) {
   *    super();
   *  }
   * }
   *
   * expect(() => {
   *  throw new TestError(90);
   * }).toThrowClass(TestError, error => error.magicNumber == 90)
   *
   * expect(() => {
   *  throw new TestError(90);
   * }).not.toThrowClass(TestError, error => error.magicNumber == 7)
   * ```
   *
   * Subclasses equally satisfy the matcher:
   *
   * ```
   * class TestError extends Error {
   *  constructor(readonly magicNumber: number) {
   *    super();
   *  }
   * }
   *
   * class SubError extends TestError {}
   *
   * expect(() => {
   *  throw new SubError(92);
   * }).toThrowClass(TestError)
   *
   * expect(() => {
   *  throw new SubError(92);
   * }).toThrowClass(TestError, error => error.magicNumber == 92)
   * ```
   *
   * Finally, primitive values thrown instead of `Error` are still supported - although only via `.not`:
   *
   * ```
   * expect(() => {
   *  throw "Just a string";
   * }).not.toThrowClass(TestError);
   * ```
   */
  toThrowClass: <E extends Error>(
    expectedClass: new (...args: any[]) => E,
    predicate?: (error: E) => boolean
  ) => void;
}

declare module "vitest" {
  interface Assertion<T = any> extends VanillaMatchers {}
  interface AsymmetricMatchersContaining extends VanillaMatchers {}
}
