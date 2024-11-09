/**
 * Utilities for elegantly creating new matchers.
 *
 * Especially noteworthy are {@link implementBooleanMatcher} and {@link implementMatcher}, to define the body of matcher functions with great minimalism.
 *
 * @module
 */

export {
  MatcherError,
  MatcherRequirements,
  implementMatcher
} from "./matcher.js";

export {
  BooleanMatcherRequirements,
  implementBooleanMatcher
} from "./booleanMatcher.js";
