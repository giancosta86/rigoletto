import { describe } from "vitest";

import { scenario } from "@giancosta86/rigoletto/testing";

class MyError extends Error {
  constructor(readonly magicNumber: number) {
    super();
  }
}

describe("toExistInFileSystem()", () => {
  scenario("when passing an existing file path")
    .subject(import.meta.filename)
    .passes(e => e.toExistInFileSystem())
    .withErrorWhenNegated("Unexpected file system entry");
});

describe("toThrowClass()", () => {
  scenario("when throwing a matching error")
    .functionSubject(() => {
      throw new MyError(91);
    })
    .passes(e => e.toThrowClass(MyError, e => e.magicNumber == 91))
    .withErrorWhenNegated("Unexpected error of class MyError");
});
