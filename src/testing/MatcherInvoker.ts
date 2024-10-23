import { Assertion } from "vitest";

/**
 * Function having the purpose of invoking a *matcher*.
 *
 * The matcher can be either *synchronous* or *asynchronous* - both cases
 * will be transparently handled.
 *
 * @typeParam T The type of the *subject* - the value passed to `expect()`.
 *
 * @param assertion The result of `expect(...)` or `expect(...).not` - so you'll need to call a `.to|have|...()` matcher on it.
 *
 * @returns
 *  * `void` - in the case of a *synchronous* matcher.
 *
 *  * `Promise<void>` in the case of an *asynchronous* matcher.
 */
export type MatcherInvoker<T> = (
  assertion: Assertion<T>
) => void | Promise<void>;
