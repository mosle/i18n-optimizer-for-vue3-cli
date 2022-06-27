import { createKeyObjectFromNotations, createObjectOnlyHasPaths } from "../src/collector";

import en from "./fixtures/locales/en.json";
test("", () => {
  const array = ["a", "b", "c", "d", "e"] as const;
  const object = createKeyObjectFromNotations(array);

  expect(object["a"]).toEqual("a");
  expect(object["b"]).toEqual("b");
  expect(object["c"]).toEqual("c");
  expect(object["d"]).toEqual("d");
  expect(object["e"]).toEqual("e");

  expect(Object.keys(object).length).toEqual(array.length);
  expect(Object.values(object).length).toEqual(array.length);
  expect(Object.keys(object).join("")).toEqual(array.join(""));
  expect(Object.values(object).join("")).toEqual(array.join(""));
});

test("", () => {
  const optimized = createObjectOnlyHasPaths(en, ["Commands:"]);
  expect(optimized).toHaveProperty("Commands:");
  expect(optimized).not.toHaveProperty("Options:");
  expect(Object.keys(optimized).length).toEqual(1);
});

test("", () => {
  const optimized = createObjectOnlyHasPaths(en, ["Not enough non-option arguments: got %s, need at least %s.one"]);
  expect(optimized).toHaveProperty("Not enough non-option arguments: got %s, need at least %s");
  expect(optimized).toHaveProperty("Not enough non-option arguments: got %s, need at least %s.one");
  expect(Object.keys(optimized).length).toEqual(1);
});

test("", () => {
  const locale = {
    a: "a",
    b: "b",
    "b.test": "b.test",
    c: {
      test: "c.test",
    },
  };
  const optimized = createObjectOnlyHasPaths(locale, ["c", "b.test"], "[SEPARATOR]");

  expect(optimized).toHaveProperty("c.test", "c.test");
  expect(optimized["b.test"]).toEqual("b.test");
  expect(optimized).not.toHaveProperty("b.test");
});
