import type { ExpectationResult, MatcherState } from "@vitest/expect";
import { existsSync } from "node:fs";

export function toExistInFileSystem(
  this: MatcherState,
  receivedPath: string
): ExpectationResult {
  const pass = existsSync(receivedPath);

  const { isNot } = this;
  return {
    pass,
    message: () =>
      isNot
        ? `Unexpected file system entry: '${receivedPath}'`
        : `Missing file system entry: '${receivedPath}'`
  };
}
