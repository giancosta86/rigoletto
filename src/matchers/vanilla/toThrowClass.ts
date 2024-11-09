import type { ExpectationResult, MatcherState } from "@vitest/expect";

import { BasicWrapper } from "@/core";
import { implementMatcher } from "@/creation";

function getThrownWrapper(codeBlock: () => void): BasicWrapper | null {
  try {
    codeBlock();
    return null;
  } catch (e) {
    return { value: e };
  }
}

export function toThrowClass<E extends Error>(
  this: MatcherState,
  subjectCodeBlock: () => void,
  expectedClass: new () => E,
  predicate?: (error: E) => boolean
): ExpectationResult {
  const thrownWrapper = getThrownWrapper(subjectCodeBlock);

  return implementMatcher({
    matcherState: this,

    getErrorWhenAsserted() {
      if (thrownWrapper == null) {
        return "Nothing was thrown";
      }

      if (!(thrownWrapper.value instanceof Error)) {
        return `A value of type ${typeof thrownWrapper.value} - not of class ${
          expectedClass.name
        } - was thrown`;
      }

      if (!(thrownWrapper.value instanceof expectedClass)) {
        return `An error of class ${thrownWrapper.value.constructor.name} - not assignable to ${expectedClass.name} - was thrown`;
      }

      if (predicate && !predicate(thrownWrapper.value as E)) {
        return thrownWrapper.value.constructor == expectedClass
          ? `An error of class ${expectedClass.name} was thrown, but the predicate was not satisfied`
          : `An error of class ${thrownWrapper.value.constructor.name}, assignable to ${expectedClass.name}, was thrown - but the predicate was not satisfied`;
      }

      return null;
    },

    getErrorWhenNegated() {
      if (!thrownWrapper) {
        return null;
      }

      if (!(thrownWrapper.value instanceof expectedClass)) {
        return null;
      }

      if (predicate) {
        if (predicate(thrownWrapper.value as E)) {
          return thrownWrapper.value.constructor == expectedClass
            ? `Unexpected error of class ${expectedClass.name} having satisfied predicate`
            : `Unexpected error of class ${thrownWrapper.value.constructor.name}, assignable to ${expectedClass.name}, having satisfied predicate`;
        } else {
          return null;
        }
      }

      return thrownWrapper.value.constructor == expectedClass
        ? `Unexpected error of class ${expectedClass.name}`
        : `Unexpected error of class ${thrownWrapper.value.constructor.name}, assignable to ${expectedClass.name}`;
    }
  });
}
