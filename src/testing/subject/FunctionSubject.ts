import { BasicWrapper } from "@/core";
import { Subject } from "./Subject.js";

/**
 * Value that must be a `function`.
 */
export type FunctionSubjectValue = Function;

/**
 * Subject whose `expect()` argument is a `function` that will **not** be called beforehand.
 */
export class FunctionSubject implements Subject {
  constructor(private readonly functionValue: FunctionSubjectValue) {}

  getExpectArgumentWrapper(): Promise<BasicWrapper> {
    return Promise.resolve({ value: this.functionValue });
  }
}
