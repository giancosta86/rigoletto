import type * as testPass from "./testPass.js";
import type * as testFail from "./testFail.js";
import type { MatcherClause } from "./MatcherClause.js";
import { SubjectClause } from "./SubjectClause.js";

/**
 * Test scenario for a matcher.
 *
 * It tests the matcher in isolation as well as when preceded by `.not`, with opposite outcomes:
 *
 * * one expected to be ✅*successful*
 *
 * * one expected to ❌*fail*
 *
 * Objects of this interfaces are created by functions such as {@link testPass.testPass | ✅testPass()} and {@link testFail.testFail | ❌testFail()}.
 *
 * To run its tests, you'll need to call, in this precise order, its 3 fluent methods:
 *
 * 1. {@link withSubject} - or {@link withSubjectNotToAwait}
 *
 * 1. {@link SubjectClause.withMatcher | withMatcher}
 *
 * 1. {@link MatcherClause.withFailureMessage | withFailureMessage }
 *
 * @typeParam T The type of the *subject* - the value passed to `expect()`.
 *
 * @example
 *
 * ```
 * testPass("when the subject is a number")
 *     .withSubject(() => 9)
 *     .withMatcher(e => e.toBe(9))
 *     .withFailureMessage("expected 9 not to be 9"); //The last call triggers the tests
 * ```
 */
export interface Scenario<T> {
  /**
   * Defines the *subject* of each test - i.e., the argument of the `expect()` call.
   *
   * @param subjectRetriever It **must** be a function returning the actual subject - which, in turn,
   * could be any value - including:
   *
   * * a `Promise` - in this case, it will be `await`ed to get the actual subject
   *
   * * a function - useful to test matchers like `.toThrow()`.
   *
   * @returns The scenario itself, to support fluent notation.
   *
   * @example
   *
   * Primitive value:
   *
   * ```
   * .withSubject(() => 90)
   * ```
   *
   * @example
   *
   * `Promise`, which will be `await`ed to get the actual value (in this case, `90`)
   *
   * ```
   * .withSubject(() => Promise.resolve(90))
   * ```
   *
   * @example
   *
   * Function, which will be passed as it is to the `expect()` call:
   *
   * ```
   * testPass("when the subject is a function")
   *  .withSubject(() => () => {
   *    throw new Error("Dodo");
   *  })
   *  .withMatcher(e => e.toThrow("Dodo"))
   *  .withFailureMessage("to throw error not including 'Dodo'");
   * ```
   */
  withSubject(subjectRetriever: () => T | Promise<T>): SubjectClause<T>;

  /**
   * Variation of {@link withSubject} that does not perform `await` on its `Promise` subject.
   *
   * This is especially useful in the case of matchers - like `toResolve()` -
   * whose *subject* is not the *value* returned by the `Promise`, but the `Promise` itself.
   *
   * @param subjectRetriever A function returning the `Promise` that will directly become the subject of the matcher.
   *
   * @returns The scenario itself, to support fluent notation.
   *
   * @example
   *
   * ```
   * testPass("when the subject is a resolved Promise not to await")
   *   .withSubjectNotToAwait(() => Promise.resolve(92))
   *   .withMatcher(e => e.toResolve())
   *   .withFailureMessage("Expected promise to reject, however it resolved");
   * ```
   */
  withSubjectNotToAwait(subjectRetriever: () => Promise<T>): SubjectClause<T>;
}
