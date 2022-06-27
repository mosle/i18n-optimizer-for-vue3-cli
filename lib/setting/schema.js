"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
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
exports.default = schema;
