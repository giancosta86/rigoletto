import { describe } from "vitest";

import { scenario } from "@giancosta86/rigoletto/testing";

describe("toResolve()", () => {
  scenario("when passing a resolved promise")
    .promiseSubject(Promise.resolve(90))
    .passes(e => e.toResolve())
    .withErrorWhenNegated("Expected promise to reject, however it resolved");
});

describe("toReject()", () => {
  scenario("when passing a resolved promise")
    .promiseSubject(Promise.resolve(92))
    .fails(e => e.toReject())
    .withError("Expected promise to reject, however it resolved");
});
