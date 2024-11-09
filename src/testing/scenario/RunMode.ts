import { describe } from "vitest";

/**
 * Describes how a scenario should be executed in Vitest.
 */
export class RunMode {
  static readonly Standard: RunMode = new RunMode(describe);

  static readonly Only: RunMode = new RunMode(describe.only);

  static readonly Skip: RunMode = new RunMode(describe.skip);

  private constructor(
    private readonly variantOfDescribeToCall:
      | typeof describe
      | typeof describe.only
      | typeof describe.skip
  ) {}

  public runInDescribe(description: string, block: () => void | Promise<void>) {
    this.variantOfDescribeToCall(description, block);
  }
}
