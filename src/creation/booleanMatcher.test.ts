import { ExpectationResult, MatcherState } from "@vitest/expect";
import { describe, expect, it } from "vitest";

import { implementBooleanMatcher } from "./booleanMatcher.js";

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

function toBeNinetyTwo(
  this: MatcherState,
  receivedNumber: number
): ExpectationResult {
  return implementBooleanMatcher({
    matcherState: this,
    assertionCondition: Promise.resolve(receivedNumber == 92),
    errorWhenAssertionFails: `${receivedNumber} is not 92`,
    errorWhenNegationFails: `Unexpected 92`
  });
}

expect.extend({ toBeNinety, toBeNinetyTwo });

describe("A simple synchronous boolean matcher", () => {
  describe("with valid subject", () => {
    it("should pass", () => {
      expect(90)["toBeNinety"]();
    });

    describe("when negated", () => {
      it("should fail", () => {
        expect(() => {
          expect(90).not["toBeNinety"]();
        }).toThrow("Unexpected 90");
      });
    });
  });

  describe("with invalid subject", () => {
    it("should fail", () => {
      expect(() => {
        expect(37)["toBeNinety"]();
      }).toThrow("37 is not 90");
    });

    describe("when negated", () => {
      it("should pass", () => {
        expect(37).not["toBeNinety"]();
      });
    });
  });
});

describe("A simple asynchronous boolean matcher", () => {
  describe("with valid subject", () => {
    it("should pass", () => {
      expect(92)["toBeNinetyTwo"]();
    });

    describe("when negated", () => {
      it("should fail", () => {
        expect(() => expect(92).not["toBeNinetyTwo"]()).rejects.toThrow(
          "Unexpected 92"
        );
      });
    });
  });

  describe("with invalid subject", () => {
    it("should fail", () => {
      expect(() => expect(37)["toBeNinetyTwo"]()).rejects.toThrow(
        "37 is not 92"
      );
    });

    describe("when negated", () => {
      it("should pass", () => {
        expect(37).not["toBeNinetyTwo"]();
      });
    });
  });
});
