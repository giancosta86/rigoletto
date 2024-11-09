import { ExpectationResult, MatcherState } from "@vitest/expect";

import { ValueOrRetriever } from "@/core";
import { implementMatcher, MatcherError } from "./matcher.js";

/**
 * The requirements to define the logic of a matcher via {@link implementBooleanMatcher}.
 */
export type BooleanMatcherRequirements = Readonly<{
  /**
   * The `this: MatcherState` opening the parameter list of every matcher.
   */
  matcherState: MatcherState;

  /**
   * The boolean expression that must be true for the matcher to pass when asserted - i.e.,
   * when used directly after `.expect(...)`; returning a `Promise` will create an asynchronous matcher.
   */
  assertionCondition: boolean | Promise<boolean>;

  /**
   * Error message to be displayed when the matcher is asserted but {@link assertionCondition} is **false**;
   * it can be either a constant or a function returning the value.
   */
  errorWhenAssertionFails: ValueOrRetriever<string>;

  /**
   * Error message to be displayed when the matcher is negated but {@link assertionCondition} is **true**;
   * it can be either a constant or a function returning the value.
   */
  errorWhenNegationFails: ValueOrRetriever<string>;
}>;

/**
 * Creates an `ExpectationResult` - that can be returned by a matcher - based on a boolean condition.
 *
 * This function will probably be the preferred way to implement most matchers.
 *
 * For details, please refer to the documentation of {@link BooleanMatcherRequirements}.
 */
export function implementBooleanMatcher(
  requirements: BooleanMatcherRequirements
): ExpectationResult {
  const {
    matcherState,
    assertionCondition,
    errorWhenAssertionFails,
    errorWhenNegationFails
  } = requirements;

  return implementMatcher({
    matcherState,

    getErrorWhenAsserted: () =>
      assertionConditionToMatcherError(assertionCondition, rawCondition =>
        rawCondition ? null : ValueOrRetriever.getValue(errorWhenAssertionFails)
      ),

    getErrorWhenNegated: () =>
      assertionConditionToMatcherError(assertionCondition, rawCondition =>
        rawCondition ? ValueOrRetriever.getValue(errorWhenNegationFails) : null
      )
  });
}

type MatcherErrorLogic = (rawCondition: boolean) => MatcherError;

function assertionConditionToMatcherError(
  assertionCondition: boolean | Promise<boolean>,
  matcherErrorLogic: MatcherErrorLogic
): MatcherError | Promise<MatcherError> {
  return assertionCondition instanceof Promise
    ? assertionCondition.then(matcherErrorLogic)
    : matcherErrorLogic(assertionCondition);
}
