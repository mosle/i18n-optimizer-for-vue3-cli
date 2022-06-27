import { JSONSchemaType } from "ajv";

//const outputType = ["yaml", "json", "yml"] as const;

export type Setting = {
  outputDir: string;
  inputDir: string;
  checkPatterns: string[];
  targetFunctionNames: { [key: string]: number };
  argumentSeparator: string;
};

const schema: JSONSchemaType<Setting> = {
  type: "object",
  properties: {
    outputDir: { type: "string" },
    inputDir: { type: "string" },
    checkPatterns: { type: "array", items: { type: "string" }, uniqueItems: true },
    targetFunctionNames: {
      type: "object",
      patternProperties: {
        "^.+$": { type: "number", minimum: 0 },
      },
      required: [],
    },
    argumentSeparator: { type: "string", default: "." },
  },
  required: ["outputDir", "inputDir", "checkPatterns", "targetFunctionNames"],
  additionalProperties: false,
};

export default schema;
