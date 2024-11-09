import { describe, expect, it } from "vitest";

import { MatcherClauseInput } from "./MatcherClauseInput.js";
import { MatcherInvoker } from "./MatcherInvoker.js";
import { PassMatcherClause } from "./PassMatcherClause.js";
import { ScenarioTestBlock } from "./ScenarioTestBlock.js";

export class ConcretePassMatcherClause implements PassMatcherClause {
  constructor(private readonly input: MatcherClauseInput) {}

  withErrorWhenNegated(message: string): void {
    const scenarioTestBlock = new ScenarioTestBlock({
      ...this.input,

      runSubtests(expectArgument: unknown, matcherInvoker: MatcherInvoker) {
        it("should pass", () => matcherInvoker(expect(expectArgument)));

        describe("when negated", () => {
          it("should fail", () =>
            expect(async () => {
              await matcherInvoker(expect(expectArgument).not);
            }).rejects.toThrow(message));
        });
      }
    });

    scenarioTestBlock.run();
  }
}
