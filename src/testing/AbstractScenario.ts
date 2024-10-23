import { MatcherInvoker } from "./MatcherInvoker.js";
import { Scenario } from "./Scenario.js";
import { ScenarioRunMode } from "./ScenarioRunMode.js";
import { Subject } from "./Subject.js";
import {
  ConcreteSubjectClause,
  SubjectClause,
  SubjectClauseInput
} from "./SubjectClause.js";

export abstract class AbstractScenario<T> implements Scenario<T> {
  constructor(
    private readonly description: string,
    private readonly runMode: ScenarioRunMode
  ) {}

  private createSubjectClauseInput(
    subjectRetriever: () => Promise<Subject<T>>
  ): SubjectClauseInput<T> {
    return {
      description: this.description,
      runMode: this.runMode,
      subjectRetriever,
      runScenario: this.run
    };
  }

  withSubject(subjectRetriever: () => T | Promise<T>): SubjectClause<T> {
    const actualSubjectRetriever = async () => {
      const subject = subjectRetriever();
      const actualSubject = await subject;
      return new Subject<T>(actualSubject);
    };

    const subjectClauseInput = this.createSubjectClauseInput(
      actualSubjectRetriever
    );

    return new ConcreteSubjectClause(subjectClauseInput);
  }

  withSubjectNotToAwait(subjectRetriever: () => Promise<T>): SubjectClause<T> {
    const actualSubjectRetriever = async () => {
      const subject = subjectRetriever();
      return new Subject(subject);
    };

    const subjectClauseInput = this.createSubjectClauseInput(
      actualSubjectRetriever
    );

    return new ConcreteSubjectClause(subjectClauseInput);
  }

  protected abstract run(
    subject: T | Promise<T>,
    matcherInvoker: MatcherInvoker<T>,
    failureMessage: string
  ): void;
}
