import { describe } from "vitest";
import { testFail, testPass } from "~/testing";

describe("toExistInFileSystem()", () => {
  testPass("when the path is an existing file")
    .withSubject(() => import.meta.filename)
    .withMatcher(e => e.toExistInFileSystem())
    .withFailureMessage("Unexpected file system entry");

  testPass("when the path is an existing directory")
    .withSubject(() => import.meta.dirname)
    .withMatcher(e => e.toExistInFileSystem())
    .withFailureMessage("Unexpected file system entry");

  testFail("when the path is missing")
    .withSubject(() => "<SOMETHING INEXISTING>")
    .withMatcher(e => e.toExistInFileSystem())
    .withFailureMessage("Missing file system entry");
});
