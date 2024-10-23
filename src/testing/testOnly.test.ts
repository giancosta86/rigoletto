import { describe, test } from "vitest";
import { testPass } from "./testPass.js";
import { testFail } from "./testFail.js";

describe("When using .only()", () => {
  test("this should be skipped, as it fails by definition", () => {
    throw new Error("This fails");
  });

  describe("toBe()", () => {
    testPass
      .only("tested with testPass.only()")
      .withSubject(() => 90)
      .withMatcher(e => e.toBe(90))
      .withFailureMessage("expected 90 not to be 90");

    testFail
      .only("tested with testPass.only()")
      .withSubject(() => 90)
      .withMatcher(e => e.toBe(7))
      .withFailureMessage("expected 90 to be 7");
  });
});
