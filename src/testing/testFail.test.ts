import { describe } from "vitest";
import { testFail } from "./testFail.js";

describe("When testing testFail()", () => {
  describe("toBe()", () => {
    testFail("when the subject is a number")
      .withSubject(() => 7)
      .withMatcher(e => e.toBe(90))
      .withFailureMessage("expected 7 to be 90");

    testFail("when the subject is a string")
      .withSubject(() => "Dodo")
      .withMatcher(e => e.toBe("Bubus"))
      .withFailureMessage("expected 'Dodo' to be 'Bubus'");

    testFail("when the subject is a resolved Promise to await")
      .withSubject(() => Promise.resolve(90))
      .withMatcher(e => e.toBe(91))
      .withFailureMessage("expected 90 to be 91");

    testFail
      .skip("when using .skip on a wrong test")
      .withSubject(() => 9)
      .withMatcher(e => e.toBe(9))
      .withFailureMessage("<ANY MESSAGE>");
  });

  describe("toThrow()", () => {
    testFail("when the subject is a function")
      .withSubject(() => () => {
        throw new Error("Dodo");
      })
      .withMatcher(e => e.toThrow("Yogi"))
      .withFailureMessage("to throw error including 'Yogi' but got 'Dodo'");
  });

  describe("toBeNull()", () => {
    testFail("when the subject is a resolved Promise not to await")
      .withSubjectNotToAwait(() => Promise.resolve(90))
      .withMatcher(e => e.toBeNull())
      .withFailureMessage("expected Promise{…} to be null");
  });

  describe("toReject()", () => {
    testFail("when the subject is a resolved Promise not to await")
      .withSubjectNotToAwait(() => Promise.resolve(90))
      .withMatcher(e => e.toReject())
      .withFailureMessage("Expected promise to reject, however it resolved");
  });
});
