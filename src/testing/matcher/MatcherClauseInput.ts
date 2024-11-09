import { SubjectClauseInput } from "../subject/index.js";
import { MatcherInvoker } from "./MatcherInvoker.js";

export type MatcherClauseInput = SubjectClauseInput &
  Readonly<{
    matcherInvoker: MatcherInvoker;
  }>;
