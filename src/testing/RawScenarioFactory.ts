import { Scenario } from "./Scenario.js";
import { ScenarioRunMode } from "./ScenarioRunMode.js";

/**
 * Creates an instance of {@link Scenario} from the expected constructor arguments.
 *
 * @typeParam T The type of the *subject* - the value passed to `expect()`.
 */
export type RawScenarioFactory = <T>(
  description: string,
  runMode: ScenarioRunMode
) => Scenario<T>;
