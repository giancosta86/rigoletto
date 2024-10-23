import { Scenario } from "./Scenario.js";
import { RawScenarioFactory } from "./RawScenarioFactory.js";
import { ScenarioRunMode } from "./ScenarioRunMode.js";

/**
 * Function creating and setting up a {@link Scenario}.
 *
 * Just like `describe()`, it supports variants like `.only()` and `.skip()`.
 */
export interface ScenarioFactory {
  /**
   * Creates the scenario within a standard `describe()` call.
   *
   * @typeParam T The type of the *subject* - the value passed to `expect()`.
   *
   * @param description The description passed to the root `describe()` call defining the scenario.
   */
  <T>(description: string): Scenario<T>;

  /**
   * Acts as a `describe.only()` call for the scenario.
   *
   * @typeParam T The type of the *subject* - the value passed to `expect()`.
   *
   * @param description The description passed to the root `describe()` call defining the scenario.
   */
  only<T>(description: string): Scenario<T>;

  /**
   * Skips the entire scenario via `describe.skip()`.
   *
   * @typeParam T The type of the *subject* - the value passed to `expect()`.
   *
   * @param description The description passed to the root `describe()` call defining the scenario.
   */
  skip<T>(description: string): Scenario<T>;
}

export const ScenarioFactory = {
  /**
   * Given a {@link RawScenarioFactory}, creates a full-fledged {@link ScenarioFactory}.
   */
  create(rawScenarioFactory: RawScenarioFactory): ScenarioFactory {
    const resultFunction = <T>(description: string) =>
      rawScenarioFactory<T>(description, ScenarioRunMode.Standard);

    resultFunction.only = <T>(description: string) =>
      rawScenarioFactory<T>(description, ScenarioRunMode.Only);

    resultFunction.skip = <T>(description: string) =>
      rawScenarioFactory<T>(description, ScenarioRunMode.Skip);

    return resultFunction;
  }
};
