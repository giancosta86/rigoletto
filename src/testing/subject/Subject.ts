import { BasicWrapper } from "@/core";

/**
 * The subject of a scenario, from which the argument of the `expect()` function can be retrieved.
 */
export interface Subject {
  /**
   * Returns the the argument of `expect()`, encapsulated into a {@link BasicWrapper}.
   */
  getExpectArgumentWrapper(): Promise<BasicWrapper>;
}
