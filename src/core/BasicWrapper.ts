/**
 * Encapsulates any value, adding a layer of indirection.
 *
 * It is especially useful when an `async` function returns a `Promise` that should **not** be `await`ed: it can be wrapped instead.
 *
 * @typeParam T - the type of the wrapped value.
 */
export type BasicWrapper<T = unknown> = Readonly<{
  value: T;
}>;
