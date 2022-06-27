import * as file from "../src/file";
import { resolve } from "path";

import { collectFunctionArgumentsFromFile } from "../src/collector";
import { createTable, add, keysOf } from "../src/analyzer";

describe("main", () => {
  test("", () => {
    const table = createTable();
    const vueFiles = file.extractAll(resolve(__dirname, "fixtures/vue/**/*.vue"));
    vueFiles.forEach((vue) => {
      const keys = collectFunctionArgumentsFromFile({ filePath: vue }, { t: 0, tt: 0 });
      keys.forEach((key) => add(table, key));
    });

    expect(keysOf(table)).toContain("__EXAMPLE1__1");
  });
});

describe("ts", () => {
  test("", () => {
    const table = createTable();
    const files = file.extractAll(resolve(__dirname, "fixtures/ts/**/*.ts"));
    files.forEach((file) => {
      const keys = collectFunctionArgumentsFromFile({ filePath: file }, { t: 0, tt: 0 });
      keys.forEach((key) => add(table, key));
    });

    expect(keysOf(table)).toContain("__EXAMPLE1__1");
    expect(keysOf(table)).toContain("__EXAMPLE1__0");
  });
  test("", () => {
    const table = createTable();
    const files = file.extractAll(resolve(__dirname, "fixtures/js/**/*.js"));
    files.forEach((file) => {
      const keys = collectFunctionArgumentsFromFile({ filePath: file }, { t: 0, tt: 0 });
      keys.forEach((key) => add(table, key));
    });

    expect(keysOf(table)).toContain("__EXAMPLE1__1");
    expect(keysOf(table)).toContain("__EXAMPLE1__0");
  });
});
