import { describe } from "vitest";

import { scenario } from "../scenario/index.js";

describe("When testing matchers using .passes()", () => {
  describe("toBe() - tested together with .subject()", () => {
    describe("when the subject is a plain value", () => {
      scenario("when the subject is a number")
        .subject(74)
        .fails(e => e.toBe(90))
        .withError("expected 74 to be 90");

      scenario("when the subject is a string")
        .subject("Yogi")
        .fails(e => e.toBe("Dodo"))
        .withError("expected 'Yogi' to be 'Dodo");

      scenario
        .skip("when using .skip on a wrong test")
        .subject(9)
        .fails(e => e.toBe(9))
        .withError("<ANY MESSAGE>");
    });

    scenario("when the subject is a resolved Promise to await")
      .subject(Promise.resolve(74))
      .fails(e => e.toBe(90))
      .withError("expected 74 to be 90");

    describe("when the subject is a function", () => {
      scenario("when the function returns a plain value")
        .subject(() => 74)
        .fails(e => e.toBe(90))
        .withError("expected 74 to be 90");

      scenario("when the function returns a Promise to await")
        .subject(() => Promise.resolve(74))
        .fails(e => e.toBe(90))
        .withError("expected 74 to be 90");
    });
  });

  describe("toReject() - tested together with .promiseSubject()", () => {
    scenario("when the subject is a Promise not to await")
      .promiseSubject(Promise.resolve("Some error"))
      .fails(e => e.toReject())
      .withError("Expected promise to reject, however it resolved");

    scenario("when the subject is a function returning a Promise not to await")
      .promiseSubject(() => Promise.resolve("Some error"))
      .fails(e => e.toReject())
      .withError("Expected promise to reject, however it resolved");
  });

  describe("toThrow() - tested together with .functionSubject()", () => {
    scenario("when the subject is a function")
      .functionSubject(() => {
        //Just do nothing
      })
      .fails(e => e.toThrow("Dodo"))
      .withError("to throw an error");
  });
});
