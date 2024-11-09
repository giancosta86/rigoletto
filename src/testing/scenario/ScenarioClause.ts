import {
  EagerSubjectValue,
  FunctionSubjectValue,
  PromiseSubjectValue,
  SubjectClause
} from "../subject/index.js";

export interface ScenarioClause {
  /**
   * Defines the *subject* of each test - i.e., the argument of the `expect()` call.
   *
   * @param value Can be:
   *
   * * a value of any type - when not a `Promise` or a function - that will be passed to `expect()`
   *
   * * a `Promise` - that will be `await`ed to get the `expect()` argument
   *
   * * a function - that will be called to retrieve one of the above types and then behave accordingly
   *
   * @example
   *
   * Immediate value:
   *
   * ```
   * .subject(90)
   * ```
   *
   * @example
   *
   * `Promise`, which will be `await`ed to get the actual value (in this case, `90`)
   *
   * ```
   * .subject(Promise.resolve(90))
   * ```
   *
   * @example
   *
   * Function returning the value:
   *
   * ```
   * .subject(() => 90)
   * ```
   *
   * @example
   *
   * Function returning a `Promise` that will be `await`ed after the function call:
   *
   * ```
   * .subject(() => Promise.resolve(90))
   * ```
   */
  subject(value: EagerSubjectValue): SubjectClause;

  /**
   * Variation of {@link subject} that does not perform `await` on its `Promise` subject.
   *
   * This is especially useful in the case of matchers - like `toResolve()` -
   * whose subject is *not* the value returned by the `Promise`, but the `Promise` itself.
   *
   * @param value A `Promise` or a function returning a `Promise`
   *
   * @example
   *
   * Promise passed directly:
   *
   * ```
   * .promiseSubject(Promise.resolve(92))
   * ```
   *
   * @example
   *
   * Function returning a Promise:
   *
   * ```
   * .promiseSubject(() => Promise.resolve(92))
   * ```
   */
  promiseSubject(value: PromiseSubjectValue): SubjectClause;

  /**
   * Variation of {@link subject} that does not call the passed function.
   *
   * This is especially useful in the case of matchers expecting a function - like `.toThrow()`.
   *
   * @param value A function, that will be passed directly to `expect()`
   *
   * @example
   *
   * ```
   * .functionSubject(() => {
   *   throw new Error("Test");
   * })
   * ```
   */
  functionSubject(value: FunctionSubjectValue): SubjectClause;
}
