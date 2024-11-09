import type { SubjectClause } from "../subject/index.js";

/**
 * Creates a scenario whose subject is expected ❌*not to satisfy* the matcher under test.
 *
 * Consequently, in the `describe()` test block generated for this scenario:
 *
 * * ❌ in the subtest where the matcher is *asserted*, the message passed to {@link withError} relates to the error that is expected from the matcher.
 *
 * * ✅ in the subtest where the matcher is *negated* by `.not`, the matcher must *succeed*.
 *
 * @example
 *
 * ```
 * scenario("when the subject is a number")
 *  .subject(7)
 *  .fails(e => e.toBe(90))
 *  .withError("expected 7 to be 90"); //Error when the matcher is not preceded by `.not`
 * ```
 *
 * @remarks
 *
 * You must **never** use `.not` when calling the matcher in this scenario: use {@link SubjectClause.passes | ✅passes()} instead.
 */
export interface FailMatcherClause {
  /**
   * Describes the expected error message when the matcher is *asserted*.
   *
   * @param message The error message expected from the matcher.
   */
  withError(message: string): void;
}
