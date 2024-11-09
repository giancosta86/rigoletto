import { describe, expect, it } from "vitest";
import { ValueOrRetriever } from "./ValueOrRetriever.js";

describe("ValueOrRetriever", () => {
  describe("getValue()", () => {
    describe("when the argument is a value", () => {
      it("should return the value itself", () => {
        expect(ValueOrRetriever.getValue(90)).toBe(90);
      });
    });

    describe("when the argument is a function", () => {
      it("should return the result of the function", () => {
        expect(ValueOrRetriever.getValue(() => 95)).toBe(95);
      });
    });
  });
});
