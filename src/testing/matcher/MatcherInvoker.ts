import { Assertion } from "vitest";

/**
 * Function having the purpose of invoking a *matcher*.
 *
 * The matcher can be either *synchronous* or *asynchronous* - both cases
 * will be transparently handled.
 *
 * @param assertion The result of `expect(...)` or `expect(...).not` - so you'll need to call a `.toBe|Have|...()` matcher on it:
 *
 * ```
 * e => e.toBe(90)
 * ```
 *
 * @returns
 * * `void` - in the case of a *synchronous* matcher.
 *
 * * `Promise<void>` in the case of an *asynchronous* matcher.
 */
export type MatcherInvoker = (
  assertion: Assertion<unknown>
) => void | Promise<void>;
