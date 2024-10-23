/**
 * Encapsulates a test subject - the argument of the `expect()` function.
 *
 * It is especially useful when returned by `async` functions - in order to be able to return not just a `T`, but also a `Promise<T>`.
 *
 * @typeParam T the underlying type.
 */
export class Subject<T> {
  constructor(readonly value: T | Promise<T>) {}
}
