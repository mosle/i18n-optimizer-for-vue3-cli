"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toExample = exports.validate = exports.load = exports.parseSetting = void 0;
const ajv_1 = __importDefault(require("ajv"));
const fs_1 = __importDefault(require("fs"));
const json5_1 = __importDefault(require("json5"));
const schema_1 = __importDefault(require("./schema"));
function parseSetting(option) {
    const setting = load(option);
    return validate(setting);
}
exports.parseSetting = parseSetting;
function load({ jsonFilePath, json }) {
    json ||= jsonFilePath ? fs_1.default.readFileSync(jsonFilePath, "utf-8") : "";
    return json5_1.default.parse(json);
}
exports.load = load;
function validate(json) {
    const ajv = new ajv_1.default();
    const _validate = ajv.compile(schema_1.default);
    if (!_validate(json)) {
        const errorResult = { error: true, messages: [] };
        _validate.errors?.forEach((error) => {
            errorResult.messages = [...[{ keyword: error.keyword, message: error.message }]];
        });
        return [undefined, errorResult];
    }
    return [json, undefined];
}
exports.validate = validate;
function toExample(funcNames, exampleKeyName = `"KEY"`) {
    const expressions = [];
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
exports.toExample = toExample;
