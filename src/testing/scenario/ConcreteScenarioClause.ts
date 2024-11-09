import {
  ConcreteSubjectClause,
  EagerSubject,
  EagerSubjectValue,
  FunctionSubject,
  FunctionSubjectValue,
  PromiseSubject,
  PromiseSubjectValue,
  Subject,
  SubjectClause,
  SubjectClauseInput
} from "../subject/index.js";
import { RunMode } from "./RunMode.js";
import { ScenarioClause } from "./ScenarioClause.js";

export class ConcreteScenarioClause implements ScenarioClause {
  constructor(
    private readonly description: string,
    private readonly runMode: RunMode
  ) {}

  private createSubjectClause(subject: Subject): SubjectClause {
    const subjectClauseInput: SubjectClauseInput = {
      description: this.description,
      runMode: this.runMode,
      subject
    };

    return new ConcreteSubjectClause(subjectClauseInput);
  }

  subject(value: EagerSubjectValue): SubjectClause {
    return this.createSubjectClause(new EagerSubject(value));
  }

  promiseSubject(value: PromiseSubjectValue): SubjectClause {
    return this.createSubjectClause(new PromiseSubject(value));
  }

  functionSubject(value: FunctionSubjectValue): SubjectClause {
    return this.createSubjectClause(new FunctionSubject(value));
  }
}
