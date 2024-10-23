import { describe } from "vitest";
import { testFail, testPass } from "@giancosta86/rigoletto/testing";

describe("toResolve()", () => {
  testPass("when passing a resolved promise")
    .withSubjectNotToAwait(() => Promise.resolve(90))
    .withMatcher(e => e.toResolve())
    .withFailureMessage("Expected promise to reject, however it resolved");
});

describe("toReject()", () => {
  testFail("when passing a resolved promise")
    .withSubjectNotToAwait(() => Promise.resolve(92))
    .withMatcher(e => e.toReject())
    .withFailureMessage("Expected promise to reject, however it resolved");
});
