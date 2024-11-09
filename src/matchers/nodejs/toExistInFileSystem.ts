import type { ExpectationResult, MatcherState } from "@vitest/expect";
import { access } from "node:fs/promises";

import { implementBooleanMatcher } from "@/creation";

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export function toExistInFileSystem(
  this: MatcherState,
  subjectPath: string
): ExpectationResult {
  return implementBooleanMatcher({
    matcherState: this,

    assertionCondition: pathExists(subjectPath),

    errorWhenAssertionFails: `Missing file system entry: '${subjectPath}'`,

    errorWhenNegationFails: `Unexpected file system entry: '${subjectPath}'`
  });
}
