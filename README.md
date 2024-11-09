# rigoletto

_Elegant matchers in TypeScript for Vitest_

[![NPM Version](https://img.shields.io/npm/v/%40giancosta86%2Frigoletto?style=for-the-badge&logo=npm&color=forestgreen)](https://www.npmjs.com/package/@giancosta86/rigoletto)

![Logo](logo.jpg)

_Elegance_ in software development is the result of several aspects - primarily _expressiveness_ and _minimalism_ - not only in the _main codebase_ of a project, but in its _tests_ as well.

Consequently, in modern test frameworks like **Vitest**, _reusing test logic_ via declarative **custom matchers** - such as `expect(myShape).toBeConvex()` - seems a very effective option... but alas, these constructs are not always perceived as easy to create, let alone to test extensively.

As a result, **rigoletto** focuses on:

1. the **creation** and **testing** of custom matchers for [Vitest](https://vitest.dev), via a minimalist [TypeScript](https://www.typescriptlang.org) programming interface.

1. providing various _sets of ready-made matchers_ - especially for _vanilla TypeScript_ as well as _NodeJS_.

1. as a plus, exporting configuration files to easily reference [jest-extended](https://jest-extended.jestcommunity.dev) in Vitest-based tests.

This guide will now briefly explain what **rigoletto** can bring to your project.

## Installation

The package on NPM is:

> @giancosta86/rigoletto

The public API entirely resides in multiple subpackages:

- `@giancosta86/rigoletto/creation`: utilities for _defining new matchers_.

- `@giancosta86/rigoletto/jest-extended`: ready-made [jest-extended](https://jest-extended.jestcommunity.dev) declarations and registrations.

- `@giancosta86/rigoletto/matchers/all`: all the custom matchers provided by Rigoletto.

- `@giancosta86/rigoletto/matchers/nodejs`: a gallery of _matchers for NodeJS_.

- `@giancosta86/rigoletto/matchers/vanilla`: a gallery of _matchers for any JavaScript VM_.

- `@giancosta86/rigoletto/testing`: utilities for _testing new matchers_ using fluent notation.

Each subpackage should be referenced via its name, with no references to its modules.

## Defining your own matchers

### Creating a basic synchronous matcher

The most straightforward way to create a matcher function is `implementBooleanMatcher()`, from `@giancosta86/rigoletto/creation`, designed for matchers that simply _check a boolean condition_ - that is, a vast majority.

More precisely, let's create a new matcher step by step:

1. Define the matcher function:

   ```typescript
   import type { ExpectationResult, MatcherState } from "@vitest/expect";

   export function toBeEven(
     this: MatcherState,
     subject: number
   ): ExpectationResult {
     //Implementation here
   }
   ```

1. Add the implementation just by returning a call to `implementBooleanMatcher()`

   ```typescript
   import type { ExpectationResult, MatcherState } from "@vitest/expect";
   import { implementBooleanMatcher } from "@giancosta86/rigoletto";

   export function toBeEven(
     this: MatcherState,
     subject: number
   ): ExpectationResult {
     return implementBooleanMatcher({
       matcherState: this,
       assertionCondition: subject % 2 == 0,
       errorWhenAssertionFails: `${subject} is odd!`,
       errorWhenNegationFails: `Unexpected even number: ${subject}`
     });
   }
   ```

To plug the matcher into Vitest - especially when using TypeScript - you'll need to:

1. Declare the TypeScript extensions:

   ```typescript
   import "vitest";

   interface MyMatchers {
     toBeEven: () => void;
   }

   declare module "vitest" {
     interface Assertion<T = any> extends MyMatchers {}
     interface AsymmetricMatchersContaining extends MyMatchers {}
   }
   ```

1. Register the matcher into `expect()`, to make it available at runtime:

   ```typescript
   import { expect } from "vitest";

   expect.extend({
     toBeEven
   });
   ```

Should you need a more sophisticated example regarding synchronous matchers - using the general-purpose `implementMatcher()` function -
please refer to the [toThrowClass](src/matchers/vanilla/toThrowClass.ts) matcher.

### Creating an asynchronous matcher

Creating an asynchronous matcher is equally easy - in the case of `implementBooleanMatcher()` just pass a `Promise<boolean>` as its condition.

For example, let's walk through the implementation of the [toExistInFileSystem()](src/matchers/nodejs/toExistInFileSystem.ts) matcher - already provided by **rigoletto**:

1. Define the matcher function:

   ```typescript
   import type { ExpectationResult, MatcherState } from "@vitest/expect";

   export function toExistInFileSystem(
     this: MatcherState,
     subjectPath: string
   ): ExpectationResult {
     //Implementation goes here
   }
   ```

1. Define or import an `async` function - or any other way to obtain a `Promise`:

   ```typescript
   async function pathExists(path: string): Promise<boolean> {
     //Implementation here
   }
   ```

1. Add the matcher implementation just by returning a call to `implementBooleanMatcher()` -
   passing the `Promise` as its assertion condition:

   ```typescript
   import type { ExpectationResult, MatcherState } from "@vitest/expect";
   import { implementBooleanMatcher } from "@giancosta86/rigoletto";

   export function toExistInFileSystem(
     this: MatcherState,
     subjectPath: string
   ): ExpectationResult {
     return implementBooleanMatcher({
       matcherState: this,
       assertionCondition: pathExists(subjectPath),
       errorWhenAssertionFails: `Missing file system entry: '${subjectPath}'`,
       errorWhenNegationFails: `Unexpected file system entry: '${subjectPath}'`
     });
   }
   ```

And that's all! As you can notice, the result type of the matcher is always `ExpectationResult` - no matter whether it is **synchronous** or **asynchronous**.

The general-purpose `implementMatcher()` function also supports `Promise` in its flows - in particular, you can merely declare `async` functions among its inputs.

Once a matcher has been implemented, let's test it - because **rigoletto** supports that, too! 🥳

## Testing matchers

The idea at the core of **rigoletto**'s testing API - provided by `@giancosta86/rigoletto/testing` - resides in the fact that, given a scenario (for example, _«when the input is an even number»_), a matcher should ✅succeed(/❌fail) - and, conversely, its negation should ❌fail(/✅succeed).

To avoid code duplication, you can use the `scenario()` function - structurally equivalent to `describe()` - and its _fluent notation_; for example, in the case of the `toBeEven()` matcher declared previously, we could test this scenario:

```typescript
import { scenario } from "@giancosta86/rigoletto/testing";

//We can build an arbitrary test structure
//using describe(), as usual
describe("toBeEven()", () => {
  describe("in its most basic form", () => {
    scenario("when applied to an even number")
      .subject(8)
      .passes(e => e.toBeEven())
      .withErrorWhenNegated("Unexpected even number: 8");
  });
});
```

The above `scenario()`, followed by ✅`.pass()`, actually expands into a `describe()` call with the same description, containing **2 tests**:

- one, containing `expect(8).toBeEven()`, which is expected to ✅**pass**

- another, containing `expect(8).not.toBeEven()`, which is expected to ❌**fail** with the given error message

You can use as many scenarios as you wish - for example:

```typescript
scenario("when applied to an odd number")
  .subject(13)
  .fails(e => e.toBeEven())
  .withError("13 is odd!");
```

In this case, `scenario()` followed by ❌`.fail()` expands into the following tests:

- one, containing `expect(13).toBeEven()`, which is expected to ❌**fail** with the given error message

- another, containing `expect(13).not.toBeEven()`, which is expected to ✅**pass**

It is interesting to note that `scenario()` transparently supports both _synchronous_ and _asynchronous_ matchers, with the very same notation.

### Important note

When defining a scenario via the `scenario()` function, you must **never** use `.not` inside a `.passes()` or `.fails()` call: use the opposite function instead.

For example, in lieu of testing like this:

```typescript
scenario("when applied to an odd number")
  .subject(13)
  .passes(e => e.not.toBeEven()) //WRONG!!! USE .fails() INSTEAD!
  .withError("13 is odd!");
```

use `.fails(e => e.toBeEven())`, as previously seen.

## The gallery of matchers

**rigoletto** comes with several _ready-made matchers_ - please, consult the subsections below for details.

### Vanilla matchers

This is a gallery of matchers that can be called _within any JavaScript VM_ supported by Vitest.

To use them, add this import to some `.d.ts` file referenced by `tsconfig.json`:

```typescript
import "@giancosta86/rigoletto/matchers/vanilla";
```

In Vitest's configuration file, the following item must be included:

```typescript
const config: ViteUserConfig = {
  test: {
    setupFiles: ["@giancosta86/rigoletto/matchers/vanilla"]
  }
};
```

### NodeJS matchers

This is a gallery of matchers specifically designed for the NodeJS environment.

To use them, add this import to some `.d.ts` file referenced by `tsconfig.json`:

```typescript
import "@giancosta86/rigoletto/matchers/nodejs";
```

In Vitest's configuration file, the following item must be included:

```typescript
const config: ViteUserConfig = {
  test: {
    setupFiles: ["@giancosta86/rigoletto/matchers/nodejs"]
  }
};
```

### Importing all matchers

This will import all the Rigoletto matchers described in the previous subsections - therefore, all the related requirements apply.

To reference them, add this import to some `.d.ts` file referenced by `tsconfig.json`:

```typescript
import "@giancosta86/rigoletto/matchers/all";
```

In Vitest's configuration file, the following item must be included:

```typescript
const config: ViteUserConfig = {
  test: {
    setupFiles: ["@giancosta86/rigoletto/matchers/all"]
  }
};
```

## Using jest-extended

Rigoletto comes with support for [jest-extended](https://jest-extended.jestcommunity.dev/), simplifying its integration into test projects.

For TypeScript, just add the following import to some `.d.ts` file referenced by `tsconfig.json`:

```typescript
import "@giancosta86/rigoletto/jest-extended";
```

In Vitest's configuration file, the following item must be included:

```typescript
const config: ViteUserConfig = {
  test: {
    setupFiles: ["@giancosta86/rigoletto/jest-extended"]
  }
};
```

## Trivia

The project name stems from the 🌷exquisite Italian 🎶opera **«Rigoletto»** by Giuseppe Verdi - whose protagonist, Rigoletto, is a court 🃏jester.

## Further references

- [Vitest](https://vitest.dev) - _Next Generation Testing Framework_

- [TypeScript](https://www.typescriptlang.org) - _JavaScript with syntax for types_
