import { describe, expect, it, test } from "vitest";

test("Two not's in sequence are just a reinforced not", () => {
  expect(() => {
    expect(90).not.not.toBe(90);
  }).toThrow("expected 90 not to be 90");
});

test("toResolve() works asynchronously, as expected", async () => {
  await expect(Promise.resolve(90)).toResolve();
});

test("It should be possible to negate .toThrow()", async () => {
  const subject = () => {
    throw new Error("Dodo");
  };

  const assertion = expect(subject);

  await expect(async () => {
    assertion.not.toThrow("Dodo");
  }).rejects.toThrow("to throw error not including 'Dodo'");
});

describe.skip("A skipped describe()", () => {
  console.info(
    "----> This message from a skipped describe() gets printed anyway!"
  );

  it("should skip 'it' blocks", () => {
    throw new Error("THIS IS NOT EXECUTED");
  });

  test("should skip 'test' blocks", () => {
    throw new Error("THIS IS NOT EXECUTED");
  });
});

describe("Testing toBe() explicitly", () => {
  describe("in a passing scenario", () => {
    it("should pass", () => expect(9).toBe(9));

    describe("when negated", () => {
      it("should fail", () =>
        expect(() => {
          expect(9).not.toBe(9);
        }).toThrow("expected 9 not to be 9"));
    });
  });

  describe("in a failing scenario", () => {
    it("should fail", () =>
      expect(() => {
        expect(7).toBe(90);
      }).toThrow("expected 7 to be 90"));

    describe("when negated", () => {
      it("should pass", () => expect(7).not.toBe(90));
    });
  });
});
