import {
  FailMatcherClause,
  MatcherInvoker,
  PassMatcherClause
} from "../matcher/index.js";

export interface SubjectClause {
  /**
   * Runs a specific matcher assertion and its negation - expecting that the assertion succeeds and its negation fails - each executed in a dedicated subtest.
   *
   * @param matcherInvoker Function invoking the matcher; it should have the following form:
   *
   * ```
   * .passes(e => e.myMatcher(arguments))
   * ```
   *
   * where `e` will be replaced by both the `expect(...)` and `expect(...).not` call; *synchronous* and *asynchronous* matchers are equally supported.
   *
   * @returns The next clause for fluent notation.
   *
   * @remarks
   *
   * You must **never** use `.not` when calling the matcher: to verify that a matcher fails for the subject, use {@link fails | ❌fails()} instead.
   */
  passes(matcherInvoker: MatcherInvoker): PassMatcherClause;

  /**
   * Runs a specific matcher assertion and its negation - expecting that the assertion fails and its negation succeeds - each executed in a dedicated subtest.
   *
   * @param matcherInvoker Function invoking the matcher; it should have the following form:
   *
   * ```
   * .fails(e => e.myMatcher(arguments))
   * ```
   *
   * where `e` will be replaced by both the `expect(...)` and `expect(...).not` call; *synchronous* and *asynchronous* matchers are equally supported.
   *
   * @returns The next clause for fluent notation.
   *
   * @remarks
   *
   * You must **never** use `.not` when calling the matcher: to verify that a matcher is satisfied by the subject, use {@link passes | ✅passes()} instead.
   */
  fails(matcherInvoker: MatcherInvoker): FailMatcherClause;
}
