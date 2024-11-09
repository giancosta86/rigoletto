import { describe, expect, it } from "vitest";

import { PromiseSubject } from "./PromiseSubject.js";

describe("Promise subject", () => {
  describe("when retrieving the expect() argument", () => {
    describe("when the value is a Promise", () => {
      it("should return the unawaited Promise", async () => {
        const wrapper = await new PromiseSubject(
          Promise.resolve(90)
        ).getExpectArgumentWrapper();

        expect(wrapper.value).toBeInstanceOf(Promise);
      });

      it("should not alter the future value of the Promise", async () => {
        const wrapper = await new PromiseSubject(
          Promise.resolve(90)
        ).getExpectArgumentWrapper();

        expect(await wrapper.value).toBe(90);
      });
    });

    describe("when the value is a function", () => {
      describe("when the function returns a Promise", () => {
        it("should return the unawaited Promise", async () => {
          const wrapper = await new PromiseSubject(() =>
            Promise.resolve(90)
          ).getExpectArgumentWrapper();

          expect(wrapper.value).toBeInstanceOf(Promise);
        });

        it("should not alter the future value of the Promise", async () => {
          const wrapper = await new PromiseSubject(() =>
            Promise.resolve(90)
          ).getExpectArgumentWrapper();

          expect(await wrapper.value).toBe(90);
        });
      });
    });
  });
});
