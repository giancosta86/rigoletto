import { describe } from "vitest";

import { scenario } from "@/testing";
import { toExistInFileSystem } from "./toExistInFileSystem.js";

describe(`${toExistInFileSystem.name}()`, () => {
  scenario("when the path is an existing file")
    .subject(import.meta.filename)
    .passes(e => e.toExistInFileSystem())
    .withErrorWhenNegated("Unexpected file system entry");

  scenario("when the path is an existing directory")
    .subject(import.meta.dirname)
    .passes(e => e.toExistInFileSystem())
    .withErrorWhenNegated("Unexpected file system entry");

  scenario("when the path is missing")
    .subject("<SOMETHING INEXISTING>")
    .fails(e => e.toExistInFileSystem())
    .withError("Missing file system entry");
});
