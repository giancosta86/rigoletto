import { MatcherClauseInput } from "./MatcherClauseInput.js";
import { MatcherInvoker } from "./MatcherInvoker.js";

export type ScenarioTestBlockInput = MatcherClauseInput &
  Readonly<{
    runSubtests: (
      expectArgument: unknown,
      matcherInvoker: MatcherInvoker
    ) => void;
  }>;

/**
 * The `describe()` block where the scenario subtests are run.
 */
export class ScenarioTestBlock {
  constructor(private readonly input: ScenarioTestBlockInput) {}

  run() {
    const { runMode, description, subject, matcherInvoker, runSubtests } =
      this.input;

    runMode.runInDescribe(description, async () => {
      const expectArgumentWrapper = await subject.getExpectArgumentWrapper();

      runSubtests(expectArgumentWrapper.value, matcherInvoker);
    });
  }
}
