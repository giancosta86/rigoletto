/**
 * Describes either a value or a function to retrieve it.
 */
export type ValueOrRetriever<T> = Readonly<T | (() => T)>;

/**
 * Utilities for {@link ValueOrRetriever}.
 */
export namespace ValueOrRetriever {
  /**
   * If the argument is a function, call it to retrieve the actual value; otherwise, return the argument itself.
   */
  export function getValue<T>(valueOrRetriever: ValueOrRetriever<T>): T {
    return typeof valueOrRetriever == "function"
      ? valueOrRetriever()
      : (valueOrRetriever as T);
  }
}
