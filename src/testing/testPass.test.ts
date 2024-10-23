import { describe } from "vitest";
import { testPass } from "./testPass.js";

describe("When testing testPass()", () => {
  describe("toBe()", () => {
    testPass("when the subject is a number")
      .withSubject(() => 9)
      .withMatcher(e => e.toBe(9))
      .withFailureMessage("expected 9 not to be 9");

    testPass("when the subject is a string")
      .withSubject(() => "Dodo")
      .withMatcher(e => e.toBe("Dodo"))
      .withFailureMessage("expected 'Dodo' not to be 'Dodo");

    testPass("when the subject is a resolved Promise to await")
      .withSubject(() => Promise.resolve(90))
      .withMatcher(e => e.toBe(90))
      .withFailureMessage("expected 90 not to be 90");

    testPass
      .skip("when using .skip on a wrong test")
      .withSubject(() => 9)
      .withMatcher(e => e.toBe(400))
      .withFailureMessage("<ANY MESSAGE>");
  });

  describe("toThrow()", () => {
    testPass("when the subject is a function")
      .withSubject(() => () => {
        throw new Error("Dodo");
      })
      .withMatcher(e => e.toThrow("Dodo"))
      .withFailureMessage("to throw error not including 'Dodo'");
  });

  describe("toBeInstanceOf()", () => {
    testPass("when the subject is a resolved Promise not to await")
      .withSubjectNotToAwait(() => Promise.resolve(95))
      .withMatcher(e => e.toBeInstanceOf(Promise))
      .withFailureMessage(
        "expected Promise{…} to not be an instance of Promise"
      );
  });

  describe("toResolve()", () => {
    testPass("when the subject is a resolved Promise not to await")
      .withSubjectNotToAwait(() => Promise.resolve(98))
      .withMatcher(e => e.toResolve())
      .withFailureMessage("Expected promise to reject, however it resolved");
  });
});
