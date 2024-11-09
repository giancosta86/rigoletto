import { ExpectationResult, MatcherState } from "@vitest/expect";
import "vitest";
import { describe, expect } from "vitest";

import { implementBooleanMatcher } from "@giancosta86/rigoletto/creation";
import { scenario } from "@giancosta86/rigoletto/testing";

function toBeNinety(
  this: MatcherState,
  receivedNumber: number
): ExpectationResult {
  return implementBooleanMatcher({
    matcherState: this,
    assertionCondition: receivedNumber == 90,
    errorWhenAssertionFails: `${receivedNumber} is not 90`,
    errorWhenNegationFails: `Unexpected 90`
  });
}

expect.extend({ toBeNinety });

describe("A simple boolean matcher", () => {
  scenario("with valid subject")
    .subject(90)
    .passes(e => e["toBeNinety"]())
    .withErrorWhenNegated("Unexpected 90");

  scenario("with incorrect subject")
    .subject(37)
    .fails(e => e["toBeNinety"]())
    .withError("37 is not 90");
});
