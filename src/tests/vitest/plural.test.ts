import plural from "../../utils/plural";
import { expect, it, describe } from "vitest";

describe("plural EN", () => {
  it("two tests", () => {
    expect(plural(2, { one: "test", other: "tests" })).toBe("tests");
  });
  it("one test", () => {
    expect(plural(1, { one: "test", other: "tests" })).toBe("test");
  });
});
