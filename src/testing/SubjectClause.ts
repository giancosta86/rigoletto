import {
  ConcreteMatcherClause,
  MatcherClause,
  MatcherClauseInput
} from "./MatcherClause.js";
import { MatcherInvoker } from "./MatcherInvoker.js";
import { ScenarioRunMode } from "./ScenarioRunMode.js";
import { Subject } from "./Subject.js";

export type SubjectClauseInput<T> = Readonly<{
  description: string;
  runMode: ScenarioRunMode;
  subjectRetriever: () => Promise<Subject<T>>;
  runScenario: (
    subject: T | Promise<T>,
    matcherInvoker: MatcherInvoker<T>,
    failureMessage: string
  ) => void;
}>;

export interface SubjectClause<T> {
  /**
   * Runs a specific matcher assertion.
   *
   * The scenario will execute such assertion both directly and preceded by `.not` - each in a dedicated test.
   *
   * @param matcherInvoker Function invoking the matcher; it should have the following form:
   *
   * ```
   * .withMatcher(e => e.MATCHER(ARGUMENTS)
   * ```
   *
   * where `e` stands for both the `expect(...)` and `expect(...).not` call; both *synchronous* and *asynchronous* matchers are supported.
   *
   * @returns The scenario itself, to support fluent notation.
   *
   * @remarks
   *
   * You must **never** use `.not` for this matcher invocation:
   *
   * * to verify that a matcher is satisfied by the subject, use {@link testPass | ✅testPass()}
   *
   * * to verify that a matcher fails for the subject, use {@link testFail | ❌testFail()}
   */
  withMatcher(matcherInvoker: MatcherInvoker<T>): MatcherClause;
}

export class ConcreteSubjectClause<T> implements SubjectClause<T> {
  constructor(private readonly input: SubjectClauseInput<T>) {}

  withMatcher(matcherInvoker: MatcherInvoker<T>): MatcherClause {
    const nextStepInput: MatcherClauseInput<T> = {
      ...this.input,
      matcherInvoker
    };

    return new ConcreteMatcherClause(nextStepInput);
  }
}
