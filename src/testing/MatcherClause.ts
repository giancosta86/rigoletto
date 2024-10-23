import { MatcherInvoker } from "./MatcherInvoker.js";
import { SubjectClauseInput } from "./SubjectClause.js";

export type MatcherClauseInput<T> = SubjectClauseInput<T> &
  Readonly<{
    matcherInvoker: MatcherInvoker<T>;
  }>;

export interface MatcherClause {
  /**
   * Describes the error message in the test that is expected to *fail*.
   *
   * @param failureMessage Internally passed to `.toThrow()` so as to test the error message emitted by the matcher.
   *
   * @returns The scenario itself, to support fluent notation.
   */
  withFailureMessage(failureMessage: string): void;
}

export class ConcreteMatcherClause<T> implements MatcherClause {
  constructor(private readonly input: MatcherClauseInput<T>) {}

  withFailureMessage(failureMessage: string): void {
    const {
      description,
      runMode,
      subjectRetriever,
      matcherInvoker,
      runScenario
    } = this.input;

    runMode.runInDescribe(description, async () => {
      const subject = await subjectRetriever();
      runScenario(subject.value, matcherInvoker, failureMessage);
    });
  }
}
