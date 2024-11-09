import { SubjectClause } from "../subject/index.js";

/**
 * Creates a scenario whose subject is expected to ✅*satisfy* the matcher under test.
 *
 * Consequently, in the `describe()` test block generated for this scenario:
 *
 * * ✅ in the subtest where the matcher is *asserted*, the matcher must *succeed*.
 *
 * * ❌ in the subtest where the matcher is *negated* by `.not`, the message passed to {@link withErrorWhenNegated} relates to the error that is expected from the matcher.
 *
 * @example
 *
 * ```
 * scenario("when the subject is a number")
 *  .subject(42)
 *  .passes(e => e.toBe(42))
 *  .withErrorWhenNegated("expected 42 not to be 42"); //Error when the matcher is preceded by `.not`
 * ```
 *
 * @remarks
 *
 * You must **never** use `.not` when calling the matcher in this scenario: use {@link SubjectClause.fails | ❌fails() } instead.
 */
export interface PassMatcherClause {
  /**
   * Describes the expected error message when the matcher is *negated*.
   *
   * @param message The error message expected from the matcher.
   */
  withErrorWhenNegated(message: string): void;
}
