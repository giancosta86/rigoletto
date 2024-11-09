import { RunMode } from "../scenario/index.js";
import { Subject } from "./Subject.js";

export type SubjectClauseInput = Readonly<{
  description: string;
  runMode: RunMode;
  subject: Subject;
}>;
