import { describe, expect, it } from "vitest";

import { BasicWrapper } from "./BasicWrapper.js";

describe("BasicWrapper", () => {
  describe("when wrapping a Promise", () => {
    describe("when returned from an async function", () => {
      it("should not await for the wrapped Promise", async () => {
        async function getWrapper(): Promise<BasicWrapper> {
          return Promise.resolve({ value: Promise.resolve(90) });
        }

        const wrapper = await getWrapper();

        expect(wrapper.value).toBeInstanceOf(Promise);
      });
    });
  });
});
