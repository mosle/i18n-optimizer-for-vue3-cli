import fs from "fs";
import { extractAll, output, outputBulk, toOutputPath } from "../src/file/file";
import path, { resolve } from "path";

test("", () => {
  const content = "test";
  const path = "/tmp/test";
  output({ path, content });
  const body = fs.readFileSync(path, "utf-8");
  expect(body).toEqual(content);
});

test("", () => {
  outputBulk({ test1: "test1", test2: "test2" }, "/tmp");
  const body1 = fs.readFileSync("/tmp/test1.json", "utf-8");
  const body2 = fs.readFileSync("/tmp/test2.json", "utf-8");

  expect(body1).toEqual("test1");
  expect(body2).toEqual("test2");
});

test("", () => {
  outputBulk({ "test1/test": "test1", "test2/test": "test2" }, "/tmp/");
  const body1 = fs.readFileSync("/tmp/test1/test.json", "utf-8");
  const body2 = fs.readFileSync("/tmp/test2/test.json", "utf-8");

  expect(body1).toEqual("test1");
  expect(body2).toEqual("test2");
});

test("", () => {
  outputBulk({ "test1/test_a.json": "test1" }, "/tmp/");
  const body1 = fs.readFileSync("/tmp/test1/test_a.json", "utf-8");

  expect(body1).toEqual("test1");
});

describe("extract", () => {
  test("", () => {
    const paths = extractAll(resolve(__dirname, "fixtures/vue/*/*.vue"));
    expect(paths.length).toEqual(2);
    expect(paths.map((path) => path.split("/").reverse()[0])).toContain("example1.vue");
  });
  test("", () => {
    const paths = extractAll(resolve(__dirname, "fixtures/vue/**/*.vue"));
    expect(paths.length).toEqual(4);
    expect(paths.map((path) => path.split("/").reverse()[0])).toContain("example1.vue");
  });
});

describe("path", () => {
  test("", () => {
    const dir = "./__tests__/fixtures/locales";
    const outputPath = toOutputPath("./__tests__/fixtures/locales/en.json", dir, "./.output");
    expect(outputPath).toEqual("./.output/en.json");
  });
  test("", () => {
    const dir = "./__tests__/fixtures/locales";
    const outputPath = toOutputPath("./__tests__/fixtures/locales/test/en.json", dir, "./.output");
    expect(outputPath).toEqual("./.output/test/en.json");
  });
  test("", () => {
    const dir = "./__tests__/fixtures/locales";
    const inputPattern = `${dir}/**/*.json`;
    const localeFilePaths = extractAll(inputPattern);
    localeFilePaths.forEach((path) => {
      const outputPath = toOutputPath(path, dir, "./.output");
      expect(outputPath).not.toContain("__tests__");
    });
  });
});
