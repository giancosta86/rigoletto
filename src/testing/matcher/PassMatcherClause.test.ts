import { describe } from "vitest";

import { scenario } from "../scenario/index.js";

describe("When testing matchers using .passes()", () => {
  describe("toBe() - tested together with .subject()", () => {
    describe("when the subject is a plain value", () => {
      scenario("when the subject is a number")
        .subject(9)
        .passes(e => e.toBe(9))
        .withErrorWhenNegated("expected 9 not to be 9");

      scenario("when the subject is a string")
        .subject("Dodo")
        .passes(e => e.toBe("Dodo"))
        .withErrorWhenNegated("expected 'Dodo' not to be 'Dodo");

      scenario
        .skip("when using .skip on a wrong test")
        .subject(9)
        .passes(e => e.toBe(400))
        .withErrorWhenNegated("<ANY MESSAGE>");
    });

    scenario("when the subject is a resolved Promise to await")
      .subject(Promise.resolve(90))
      .passes(e => e.toBe(90))
      .withErrorWhenNegated("expected 90 not to be 90");

    describe("when the subject is a function", () => {
      scenario("when the function returns a plain value")
        .subject(() => 9)
        .passes(e => e.toBe(9))
        .withErrorWhenNegated("expected 9 not to be 9");

      scenario("when the function returns a Promise to await")
        .subject(() => Promise.resolve(90))
        .passes(e => e.toBe(90))
        .withErrorWhenNegated("expected 90 not to be 90");
    });
  });

  describe("toResolve() - tested together with .promiseSubject()", () => {
    scenario("when the subject is a Promise not to await")
      .promiseSubject(Promise.resolve(95))
      .passes(e => e.toResolve())
      .withErrorWhenNegated("Expected promise to reject, however it resolved");

    scenario("when the subject is a function returning a Promise not to await")
      .promiseSubject(() => Promise.resolve(95))
      .passes(e => e.toResolve())
      .withErrorWhenNegated("Expected promise to reject, however it resolved");
  });

  describe("toThrow() - tested together with .functionSubject()", () => {
    scenario("when the subject is a function")
      .functionSubject(() => {
        throw new Error("Dodo");
      })
      .passes(e => e.toThrow("Dodo"))
      .withErrorWhenNegated("to throw error not including 'Dodo'");
  });
});
