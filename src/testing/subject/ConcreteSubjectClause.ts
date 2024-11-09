import {
  ConcreteFailMatcherClause,
  ConcretePassMatcherClause,
  FailMatcherClause,
  MatcherClauseInput,
  MatcherInvoker,
  PassMatcherClause
} from "../matcher/index.js";
import { SubjectClause } from "./SubjectClause.js";
import { SubjectClauseInput } from "./SubjectClauseInput.js";

export class ConcreteSubjectClause implements SubjectClause {
  constructor(private readonly input: SubjectClauseInput) {}

  passes(matcherInvoker: MatcherInvoker): PassMatcherClause {
    const nextStepInput: MatcherClauseInput = {
      ...this.input,
      matcherInvoker
    };

    return new ConcretePassMatcherClause(nextStepInput);
  }

  fails(matcherInvoker: MatcherInvoker): FailMatcherClause {
    const nextStepInput: MatcherClauseInput = {
      ...this.input,
      matcherInvoker
    };

    return new ConcreteFailMatcherClause(nextStepInput);
  }
}
