import { BasicWrapper, ValueOrRetriever } from "@/core";
import { Subject } from "./Subject.js";

/**
 * Value that can be:
 *
 *  * a plain value - i.e., neither a `Promise` nor a function
 *
 *  * a `Promise`, that will be `await`ed to retrieve the value
 *
 *  * a **function**, that will be called to retrieve one of the above values - still `await`ing the Promise
 */
export type EagerSubjectValue = ValueOrRetriever<unknown | Promise<unknown>>;

/**
 * Subject retrieving the `expect()` argument as eagerly as possible.
 */
export class EagerSubject implements Subject {
  constructor(private readonly value: EagerSubjectValue) {}

  async getExpectArgumentWrapper(): Promise<BasicWrapper> {
    const value = await ValueOrRetriever.getValue(this.value);

    return { value };
  }
}
