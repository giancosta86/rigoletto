import { BasicWrapper, ValueOrRetriever } from "@/core";
import { Subject } from "./Subject.js";

/**
 * Value that can be:
 *
 *  * a `Promise`, that will **not** be `await`ed
 *
 *  * a **function** returning the above `Promise`
 */
export type PromiseSubjectValue = ValueOrRetriever<Promise<unknown>>;

/**
 * Subject whose `expect()` argument is a `Promise` that will **not** be `await`ed beforehand.
 */
export class PromiseSubject implements Subject {
  constructor(private readonly value: PromiseSubjectValue) {}

  getExpectArgumentWrapper(): Promise<BasicWrapper> {
    const promise = ValueOrRetriever.getValue(this.value);

    return Promise.resolve({ value: promise });
  }
}
