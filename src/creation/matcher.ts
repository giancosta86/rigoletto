import { ExpectationResult, MatcherState } from "@vitest/expect";

/**
 * The message of the error to be thrown by the matcher, or `null` if everything is fine.
 */
export type MatcherError = string | null;

namespace MatcherError {
  export function toExpectationResult(
    matcherError: MatcherError,
    assertingMatcher: boolean
  ): ExpectationResult {
    /*
    According to vitest's logic:

    - Upon assertion, the matcher throws Vitest's `message` if `pass` is false

    - Upon negation, the matcher throws Vitest's `message` if `pass` is true

    Consequently, this assignment ensures that the error is thrown as long as it is present.
    */
    const pass = assertingMatcher
      ? matcherError === null
      : matcherError !== null;

    return {
      pass,
      message: () => {
        return matcherError!;
      }
    };
  }
}

/**
 * The requirements to define the logic of a matcher via {@link implementMatcher}.
 */
export type MatcherRequirements = Readonly<{
  /**
   * The `this: MatcherState` opening the parameter list of every matcher.
   */
  matcherState: MatcherState;

  /**
   * Evaluates whether the matcher is successful when asserted.
   *
   * @returns The error message that must be triggered by the matcher in this flow, or `null` if everything is fine;
   * returning a `Promise` will create an asynchronous matcher.
   */
  getErrorWhenAsserted(): MatcherError | Promise<MatcherError>;

  /**
   * Evaluates whether the matcher is successful when negated.
   *
   * @returns The error message that must be triggered by the matcher in this flow, or `null` if everything is fine;
   * returning a `Promise` will create an asynchronous matcher.
   */
  getErrorWhenNegated(): MatcherError | Promise<MatcherError>;
}>;

/**
 * Creates an `ExpectationResult` that can be returned by a matcher.
 *
 * It supports a minimalist way of writing matcher logic, often enabling matchers that in traditional scenarios would have been fairly inelegant to implement, such as {@link https://github.com/giancosta86/rigoletto/tree/main/src/matchers/vanilla/toThrowClass.ts | toThrowClass()}.
 *
 * There are 2 distinct flows for a matcher:
 *
 * - **assertion** - when the matcher is invoked directly after `expect(...)`
 *
 * - **negation** - when the matcher is preceded by `expect(...).not()`
 *
 * Each flow can now be analyzed separately - merely returning the error message of the error that the matcher should throw in that case.
 *
 * To simplify the implementation even more, please refer to the {@link implementBooleanMatcher} function, which you should prefer for a fairly wide range of scenarios.
 */
export function implementMatcher(
  requirements: MatcherRequirements
): ExpectationResult {
  const { matcherState, getErrorWhenAsserted, getErrorWhenNegated } =
    requirements;

  const asserting = !matcherState.isNot;

  const matcherError = asserting
    ? getErrorWhenAsserted()
    : getErrorWhenNegated();

  return matcherError instanceof Promise
    ? matcherError.then(actualError =>
        MatcherError.toExpectationResult(actualError, asserting)
      )
    : MatcherError.toExpectationResult(matcherError, asserting);
}
