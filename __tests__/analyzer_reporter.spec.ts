import fs from "fs";

jest.mock("fs");
import { createReport, removedKeys } from "../src/analyzer/reporter";

describe("", () => {
  afterAll(() => {
    jest.clearAllMocks();
  }),
    test("", () => {
      const removed = removedKeys({ a: { a: 1, b: 2, c: { c1: "c1" } }, b: { b: 2 } });
      expect(removed).toContain("a");
    });
  test("", () => {
    const a = { a: 1, b: 2, c: { c1: "c1" } };
    const b = { b: 2 };
    jest.mocked(fs.readFileSync).mockReturnValueOnce(JSON.stringify(a)).mockReturnValueOnce(JSON.stringify(b));

    const stat = new fs.Stats();
    stat.size = 0;
    jest.mocked(fs.statSync).mockReturnValueOnce(stat).mockReturnValueOnce(stat);

    const report = createReport("pathA", "pathB");
    expect(report.reduecedKeys).toContain("a");
    expect(report.reducedBytes).toEqual(0);
  });
});
