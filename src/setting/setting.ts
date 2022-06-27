import Ajv from "ajv";
import fs from "fs";
import JSON5 from "json5";
import schema, { Setting } from "./schema";

export function parseSetting(option: Parameters<typeof load>[0]) {
  const setting = load(option);
  return validate(setting);
}

export function load({ jsonFilePath, json }: { jsonFilePath: string; json?: never } | { jsonFilePath?: never; json: string }) {
  json ||= jsonFilePath ? fs.readFileSync(jsonFilePath, "utf-8") : "";
  return JSON5.parse(json);
}

type ErrorResult = { error: boolean; messages: { keyword: string; message?: string }[] };
type SuccessResult = Setting;
export function validate(json: any): [SuccessResult | undefined, ErrorResult | undefined] {
  const ajv = new Ajv();
  const _validate = ajv.compile(schema);

  if (!_validate(json)) {
    const errorResult: ErrorResult = { error: true, messages: [] };
    _validate.errors?.forEach((error) => {
      errorResult.messages = [...[{ keyword: error.keyword, message: error.message }]];
    });
    return [undefined, errorResult];
  }
  return [json, undefined];
}

export function toExample(funcNames: Setting["targetFunctionNames"], exampleKeyName: string = `"KEY"`): string {
  const expressions: string[] = [];
  for (const key in funcNames) {
    let expression = "";
    expression += `${key}(`;
    for (let i = 0; i <= funcNames[key]; i++) {
      const arg = i === funcNames[key] ? `${exampleKeyName}` : "any";
      expression += arg + ", ";
    }
    expression += "...)";
    expressions.push(expression);
  }
  return expressions.join(", ");
}
