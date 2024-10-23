import { describe } from "vitest";
import { testPass } from "@giancosta86/rigoletto/testing";

class MyError extends Error {
  constructor(readonly magicNumber: number) {
    super();
  }
}

describe("toExistInFileSystem()", () => {
  testPass("when passing an existing file path")
    .withSubject(() => import.meta.filename)
    .withMatcher(e => e.toExistInFileSystem())
    .withFailureMessage("Unexpected file system entry");
});

describe("toThrowClass()", () => {
  testPass("when throwing a matching error")
    .withSubject(() => () => {
      throw new MyError(91);
    })
    .withMatcher(e => e.toThrowClass(MyError, e => e.magicNumber == 91))
    .withFailureMessage("Unexpected error of class MyError");
});
