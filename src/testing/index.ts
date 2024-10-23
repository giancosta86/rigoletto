/**
 * Utilities for testing matchers with minimalism.
 *
 * In particular, its most important concepts are the {@link testPass | ✅testPass()}
 * and {@link testFail | ❌testFail()} functions, to easily test matchers with fluent notation.
 *
 * @module
 */

export { MatcherInvoker } from "./MatcherInvoker.js";

export { testFail } from "./testFail.js";

export { testPass } from "./testPass.js";

export { Scenario } from "./Scenario.js";

export { SubjectClause } from "./SubjectClause.js";

export { MatcherClause } from "./MatcherClause.js";
