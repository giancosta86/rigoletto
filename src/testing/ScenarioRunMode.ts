import { describe } from "vitest";

export class ScenarioRunMode {
  static readonly Standard: ScenarioRunMode = new ScenarioRunMode(describe);

  static readonly Only: ScenarioRunMode = new ScenarioRunMode(describe.only);

  static readonly Skip: ScenarioRunMode = new ScenarioRunMode(describe.skip);

  private constructor(
    private readonly describeVariantToCall:
      | typeof describe
      | typeof describe.only
      | typeof describe.skip
  ) {}

  public runInDescribe(description: string, block: () => void | Promise<void>) {
    this.describeVariantToCall(description, block);
  }
}
