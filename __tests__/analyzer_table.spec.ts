import { createTable, addBulk, keysOf } from "../src/analyzer/table";

test("", () => {
  const table = createTable();
  addBulk(table, ["aaa", "bbbb", "cccc"]);
  const keys = keysOf(table);
  expect(keys).toContain("aaa");
  expect(keys).toContain("bbbb");
  expect(keys).toContain("cccc");
});
