import { flattenKeys } from "../src/analyzer/analyzer";

import en from "./fixtures/locales/en.json";
test("", () => {
  const keys = flattenKeys(en);

  expect(keys).not.toBe(undefined);
  expect(keys).toContain("aliases:");
  expect(keys).toContain("Not enough non-option arguments: got %s, need at least %s.one");
});
