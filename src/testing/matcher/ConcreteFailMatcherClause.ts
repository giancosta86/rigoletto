import { describe, expect, it } from "vitest";

import { FailMatcherClause } from "./FailMatcherClause.js";
import { MatcherClauseInput } from "./MatcherClauseInput.js";
import { MatcherInvoker } from "./MatcherInvoker.js";
import { ScenarioTestBlock } from "./ScenarioTestBlock.js";

export class ConcreteFailMatcherClause implements FailMatcherClause {
  constructor(private readonly input: MatcherClauseInput) {}

  withError(message: string): void {
    const scenarioTestBlock = new ScenarioTestBlock({
      ...this.input,
      runSubtests(expectArgument: unknown, matcherInvoker: MatcherInvoker) {
        it("should fail", () =>
          expect(async () => {
            await matcherInvoker(expect(expectArgument));
          }).rejects.toThrow(message));

        describe("when negated", () => {
          it("should pass", () => matcherInvoker(expect(expectArgument).not));
        });
      }
    });

    scenarioTestBlock.run();
  }
}
