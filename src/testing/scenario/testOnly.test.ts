import { describe, test } from "vitest";

import { scenario } from "./scenario.js";

describe("When using .only()", () => {
  test("plain test without .only should be skipped", () => {
    throw new Error("This fails");
  });

  describe("toBe()", () => {
    scenario
      .only("tested with passes()")
      .subject(90)
      .passes(e => e.toBe(90))
      .withErrorWhenNegated("expected 90 not to be 90");

    scenario
      .only("tested with fails()")
      .subject(90)
      .fails(e => e.toBe(7))
      .withError("expected 90 to be 7");

    scenario("scenario without .only should be skipped")
      .subject(90)
      .passes(e => e.toBe(98))
      .withErrorWhenNegated("<WHATEVER>");
  });
});
