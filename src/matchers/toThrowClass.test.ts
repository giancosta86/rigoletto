import { describe } from "vitest";
import { testFail, testPass } from "~/testing";

class TestError extends Error {
  constructor(readonly magicNumber: number) {
    super();
  }
}

class SubError extends TestError {}

class AnotherError extends Error {}

describe("toThrowClass()", () => {
  testFail("when no error is thrown")
    .withSubject(() => () => {})
    .withMatcher(e => e.toThrowClass(TestError))
    .withFailureMessage("Nothing was thrown");

  testFail("when a primitive value is thrown")
    .withSubject(() => () => {
      throw 98;
    })
    .withMatcher(e => e.toThrowClass(TestError))
    .withFailureMessage(
      "A value of type number - not of class TestError - was thrown"
    );

  describe("when the error class is not assignable to the expected one", () => {
    testFail("when no predicate is given")
      .withSubject(() => () => {
        throw new AnotherError();
      })
      .withMatcher(e => e.toThrowClass(TestError))
      .withFailureMessage(
        "An error of class AnotherError - not assignable to TestError - was thrown"
      );

    testFail("when the predicate is specified")
      .withSubject(() => () => {
        throw new AnotherError();
      })
      .withMatcher(e => e.toThrowClass(TestError, e => e.magicNumber == 89))
      .withFailureMessage(
        "An error of class AnotherError - not assignable to TestError - was thrown"
      );
  });

  describe("when the exception class is the same", () => {
    testPass("when no predicate is given")
      .withSubject(() => () => {
        throw new TestError(90);
      })
      .withMatcher(e => e.toThrowClass(TestError))
      .withFailureMessage("Unexpected error of class TestError");

    testPass("when the predicate is satisfied")
      .withSubject(() => () => {
        throw new TestError(90);
      })
      .withMatcher(e =>
        e.toThrowClass(TestError, error => error.magicNumber == 90)
      )
      .withFailureMessage(
        "Unexpected error of class TestError having satisfied predicate"
      );

    testFail("when the predicate is not satisfied")
      .withSubject(() => () => {
        throw new TestError(90);
      })
      .withMatcher(e =>
        e.toThrowClass(TestError, error => error.magicNumber == 7)
      )
      .withFailureMessage(
        "An error of class TestError was thrown, but the predicate was not satisfied"
      );
  });

  describe("when the thrown error class is a subclass of the expected error", () => {
    testPass("when no predicate is given")
      .withSubject(() => () => {
        throw new SubError(92);
      })
      .withMatcher(e => e.toThrowClass(TestError))
      .withFailureMessage(
        "Unexpected error of class SubError, assignable to TestError"
      );

    testPass("when the predicate is satisfied")
      .withSubject(() => () => {
        throw new SubError(92);
      })
      .withMatcher(e =>
        e.toThrowClass(TestError, error => error.magicNumber == 92)
      )
      .withFailureMessage(
        "Unexpected error of class SubError, assignable to TestError, having satisfied predicate"
      );

    testFail("when the predicate is not satisfied")
      .withSubject(() => () => {
        throw new SubError(92);
      })
      .withMatcher(e =>
        e.toThrowClass(TestError, error => error.magicNumber == 13)
      )
      .withFailureMessage(
        "An error of class SubError, assignable to TestError, was thrown - but the predicate was not satisfied"
      );
  });
});
