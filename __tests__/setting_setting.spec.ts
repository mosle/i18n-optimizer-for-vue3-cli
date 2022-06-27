import { parseSetting, toExample } from "../src/setting/setting";

test("", () => {
  const json = `
    {}
    `;
  const [config, error] = parseSetting({ json: json });
  expect(error?.error).toEqual(true);
  expect(config).toEqual(undefined);
});

test("", () => {
  const json = `
      {
        outputDir: "test",
        inputDir: "test",
        checkPatterns: ["test"],
        targetFunctionNames:{t:0,i18n:1}
      }
      `;
  const [config, error] = parseSetting({ json: json });

  expect(config).not.toEqual(undefined);
  if (config) {
    expect(config.inputDir).toEqual("test");
  }
});

test("", () => {
  const example = toExample({ t: 1, tt: 0, a: 3 }).replace(/ /g, "");
  expect(example).toContain(`t(any, "KEY", ...)`.replace(/ /g, ""));
  expect(example).toContain(`tt("KEY", ...)`.replace(/ /g, ""));
  expect(example).toContain(`a(any, any, any, "KEY", ...)`.replace(/ /g, ""));
});
