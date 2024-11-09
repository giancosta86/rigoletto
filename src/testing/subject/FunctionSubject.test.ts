import { describe, expect, it } from "vitest";

import { FunctionSubject } from "./FunctionSubject.js";

function sayHello() {
  console.log("Hello, world!");
}

describe("Function subject", () => {
  describe("when retrieving the expect() argument", () => {
    describe("when the value is a named function", () => {
      it("should return the uncalled function", async () => {
        const wrapper = await new FunctionSubject(
          sayHello
        ).getExpectArgumentWrapper();

        expect(wrapper.value).toBe(sayHello);
      });
    });

    describe("when the value is a lambda function", () => {
      it("should return the uncalled function", async () => {
        const wrapper = await new FunctionSubject(() => {
          return 90;
        }).getExpectArgumentWrapper();

        expect(wrapper.value).toBeInstanceOf(Function);

        const functionResult = (wrapper.value as () => number)();
        expect(functionResult).toBe(90);
      });
    });
  });
});
