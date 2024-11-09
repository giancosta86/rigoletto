import { describe } from "vitest";

import { scenario } from "@/testing";
import { toThrowClass } from "./toThrowClass.js";

class TestError extends Error {
  constructor(readonly magicNumber: number) {
    super();
  }
}

class SubError extends TestError {}

class AnotherError extends Error {}

describe(`${toThrowClass.name}()`, () => {
  scenario("when no error is thrown")
    .functionSubject(() => {})
    .fails(e => e.toThrowClass(TestError))
    .withError("Nothing was thrown");

  scenario("when a primitive value is thrown")
    .functionSubject(() => {
      throw 98;
    })
    .fails(e => e.toThrowClass(TestError))
    .withError("A value of type number - not of class TestError - was thrown");

  describe("when the error class is not assignable to the expected one", () => {
    scenario("when no predicate is given")
      .functionSubject(() => {
        throw new AnotherError();
      })
      .fails(e => e.toThrowClass(TestError))
      .withError(
        "An error of class AnotherError - not assignable to TestError - was thrown"
      );

    scenario("when the predicate is specified")
      .functionSubject(() => {
        throw new AnotherError();
      })
      .fails(e => e.toThrowClass(TestError, e => e.magicNumber == 89))
      .withError(
        "An error of class AnotherError - not assignable to TestError - was thrown"
      );
  });

  describe("when the exception class is the same", () => {
    scenario("when no predicate is given")
      .functionSubject(() => {
        throw new TestError(90);
      })
      .passes(e => e.toThrowClass(TestError))
      .withErrorWhenNegated("Unexpected error of class TestError");

    scenario("when the predicate is satisfied")
      .functionSubject(() => {
        throw new TestError(90);
      })
      .passes(e => e.toThrowClass(TestError, error => error.magicNumber == 90))
      .withErrorWhenNegated(
        "Unexpected error of class TestError having satisfied predicate"
      );

    scenario("when the predicate is not satisfied")
      .functionSubject(() => {
        throw new TestError(90);
      })
      .fails(e => e.toThrowClass(TestError, error => error.magicNumber == 7))
      .withError(
        "An error of class TestError was thrown, but the predicate was not satisfied"
      );
  });

  describe("when the thrown error class is a subclass of the expected error", () => {
    scenario("when no predicate is given")
      .functionSubject(() => {
        throw new SubError(92);
      })
      .passes(e => e.toThrowClass(TestError))
      .withErrorWhenNegated(
        "Unexpected error of class SubError, assignable to TestError"
      );

    scenario("when the predicate is satisfied")
      .functionSubject(() => {
        throw new SubError(92);
      })
      .passes(e => e.toThrowClass(TestError, error => error.magicNumber == 92))
      .withErrorWhenNegated(
        "Unexpected error of class SubError, assignable to TestError, having satisfied predicate"
      );

    scenario("when the predicate is not satisfied")
      .functionSubject(() => {
        throw new SubError(92);
      })
      .fails(e => e.toThrowClass(TestError, error => error.magicNumber == 13))
      .withError(
        "An error of class SubError, assignable to TestError, was thrown - but the predicate was not satisfied"
      );
  });
});
