import type { SubjectClause } from "../subject/index.js";
import { ConcreteScenarioClause } from "./ConcreteScenarioClause.js";
import { RunMode } from "./RunMode.js";
import { ScenarioClause } from "./ScenarioClause.js";

export interface ScenarioFunction {
  /**
   * Creates the scenario within a standard `describe()` call.
   *
   * @param description The description passed to the root `describe()` call defining the scenario.
   */
  (description: string): ScenarioClause;

  /**
   * Acts as a `describe.only()` call for the scenario.
   *
   * @param description The description passed to the root `describe.only()` call defining the scenario.
   */
  only(description: string): ScenarioClause;

  /**
   * Skips the entire scenario via `describe.skip()`.
   *
   * @param description The description passed to the root `describe.skip()` call defining the scenario.
   */
  skip(description: string): ScenarioClause;
}

/**
 * Test scenario for a matcher.
 *
 * It tests the matcher in isolation as well as when preceded by `.not`, with opposite outcomes:
 *
 * * one expected to be ✅*successful*
 *
 * * one expected to ❌*fail*
 *
 * To run its tests, you'll need to pass:
 *
 * 1. a **subject** - via {@link ScenarioClause.subject | subject()}, {@link ScenarioClause.promiseSubject | promiseSubject()} or {@link ScenarioClause.functionSubject | functionSubject()}
 *
 * 1. a **matcher** and its outcome for the given subject - via {@link SubjectClause.passes | ✅passes()} or {@link SubjectClause.fails | ❌fails()}
 *
 * 1. a **failure message** for one of the subtests - with a dedicated method for each case
 *
 * The scenario and is tests are run as soon as the this information is passed.
 *
 * @example
 *
 * ```
 * scenario("when the subject is a number")
 *   .subject(9)
 *   .passes(e => e.toBe(9))
 *   .withErrorWhenNegated("expected 9 not to be 9"); //The last call triggers the tests
 * ```
 */
export const scenario: ScenarioFunction = (description: string) => {
  return new ConcreteScenarioClause(description, RunMode.Standard);
};

scenario.only = (description: string) => {
  return new ConcreteScenarioClause(description, RunMode.Only);
};

scenario.skip = (description: string) => {
  return new ConcreteScenarioClause(description, RunMode.Skip);
};
