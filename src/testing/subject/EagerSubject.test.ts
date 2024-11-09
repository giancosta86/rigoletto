import { describe, expect, it } from "vitest";

import { EagerSubject } from "./EagerSubject.js";

describe("Eager subject", () => {
  describe("when retrieving the expect() argument", () => {
    describe("when the value is plain", () => {
      it("should return the plain value", async () => {
        const wrapper = await new EagerSubject(90).getExpectArgumentWrapper();

        expect(wrapper.value).toBe(90);
      });
    });

    describe("when the value is a Promise", () => {
      it("should await for the promised value", async () => {
        const wrapper = await new EagerSubject(
          Promise.resolve(90)
        ).getExpectArgumentWrapper();

        expect(wrapper.value).toBe(90);
      });
    });

    describe("when the value is a function", () => {
      describe("when the function returns a plain value", () => {
        it("should return the plain value", async () => {
          const wrapper = await new EagerSubject(
            () => 90
          ).getExpectArgumentWrapper();

          expect(wrapper.value).toBe(90);
        });
      });

      describe("when the function returns a Promise", () => {
        it("should await for the promised value", async () => {
          const wrapper = await new EagerSubject(() =>
            Promise.resolve(90)
          ).getExpectArgumentWrapper();

          expect(wrapper.value).toBe(90);
        });
      });
    });
  });
});
