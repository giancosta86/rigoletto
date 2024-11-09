/**
 * Utilities for testing matchers with minimalism.
 *
 * In particular, its most important concept is the {@link scenario}
 * function, to easily test matchers with fluent notation.
 *
 * @module
 */

export { ScenarioClause, scenario } from "./scenario/index.js";

export {
  EagerSubjectValue,
  FunctionSubjectValue,
  PromiseSubjectValue,
  SubjectClause
} from "./subject/index.js";

export {
  FailMatcherClause,
  MatcherInvoker,
  PassMatcherClause
} from "./matcher/index.js";
