import type { ExpectationResult, MatcherState } from "@vitest/expect";

enum ThrownValue {
  NonError = 1,
  Error,
  AssignableError
}

class MatcherContext {
  private thrownValue?: ThrownValue;
  private thrownTypeName?: string;
  private predicateSatisfied?: boolean;

  constructor(private readonly expectedErrorClassName: string) {}

  setThrownValue(thrownValue: unknown) {
    if (thrownValue instanceof Error) {
      this.thrownValue = ThrownValue.Error;
      this.thrownTypeName = thrownValue.constructor.name;
    } else {
      this.thrownValue = ThrownValue.NonError;
      this.thrownTypeName = typeof thrownValue;
    }
  }

  notifyErrorIsAssignable() {
    this.thrownValue = ThrownValue.AssignableError;
  }

  setPredicateSatisfied(satisfied: boolean) {
    this.predicateSatisfied = satisfied;
  }

  get pass(): boolean {
    return (
      this.thrownValue == ThrownValue.AssignableError &&
      this.predicateSatisfied !== false
    );
  }

  get assertedMatcherError(): string {
    if (!this.thrownValue) {
      return "Nothing was thrown";
    }

    switch (this.thrownValue) {
      case ThrownValue.NonError:
        return `A value of type ${this.thrownTypeName} - not of class ${this.expectedErrorClassName} - was thrown`;

      case ThrownValue.Error:
        return `An error of class ${this.thrownTypeName} - not assignable to ${this.expectedErrorClassName} - was thrown`;

      case ThrownValue.AssignableError:
        if (this.predicateSatisfied === false) {
          return this.thrownTypeName == this.expectedErrorClassName
            ? `An error of class ${this.expectedErrorClassName} was thrown, but the predicate was not satisfied`
            : `An error of class ${this.thrownTypeName}, assignable to ${this.expectedErrorClassName}, was thrown - but the predicate was not satisfied`;
        }
    }

    throw new Error("Unexpected matcher state!");
  }

  get negatedMatcherError(): string {
    switch (this.predicateSatisfied) {
      case true:
        return this.thrownTypeName == this.expectedErrorClassName
          ? `Unexpected error of class ${this.expectedErrorClassName} having satisfied predicate`
          : `Unexpected error of class ${this.thrownTypeName}, assignable to ${this.expectedErrorClassName}, having satisfied predicate`;

      case undefined:
        return this.thrownTypeName == this.expectedErrorClassName
          ? `Unexpected error of class ${this.expectedErrorClassName}`
          : `Unexpected error of class ${this.thrownTypeName}, assignable to ${this.expectedErrorClassName}`;

      case false:
        throw new Error("Unexpected matcher state!");
    }
  }
}

export function toThrowClass<E extends Error>(
  this: MatcherState,
  receivedCodeBlock: () => void,
  expectedClass: new () => E,
  predicate?: (error: E) => boolean
): ExpectationResult {
  const context = new MatcherContext(expectedClass.name);

  try {
    receivedCodeBlock();
  } catch (e) {
    context.setThrownValue(e);

    if (e instanceof expectedClass) {
      context.notifyErrorIsAssignable();

      if (predicate != null) {
        context.setPredicateSatisfied(predicate(e));
      }
    }
  }

  const { isNot } = this;
  return {
    pass: context.pass,
    message: () =>
      isNot ? context.negatedMatcherError : context.assertedMatcherError
  };
}
