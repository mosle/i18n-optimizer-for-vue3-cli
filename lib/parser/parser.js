"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vueSfcParser = __importStar(require("./vueSfcParser"));
const tsParser = __importStar(require("./tsParser"));
const fs_1 = __importDefault(require("fs"));
function parser(fileInfo, functions) {
    const funcNodeToRetun = (nodes) => {
        return nodes.map((node) => ({ name: node.name, key: node.arguments[functions[node.name]] }));
    };
    const parse = () => {
        const searchFuncs = Object.entries(functions).map((pair) => ({ name: pair[0], argumentIndex: pair[1], type: typeof String() }));
        const returnValues = [];
        if (fileInfo.filePath.endsWith(".vue")) {
            const { script, template } = vueSfcParser.parse(fileInfo);
            if (script) {
                const nodes = tsParser.findNodesByFuncNamesWithArgumentTypes(searchFuncs, tsParser.parse(script.content));
                returnValues.push(...funcNodeToRetun(nodes));
            }
            if (template) {
                const nodes = tsParser.findNodesByMethodNamesWithArgumentTypes("_ctx", searchFuncs, tsParser.parse(template.code));
                returnValues.push(...funcNodeToRetun(nodes));
            }
        }
        else if (fileInfo.filePath.endsWith(".ts") || fileInfo.filePath.endsWith(".js")) {
            const nodes = tsParser.findNodesByFuncNamesWithArgumentTypes(searchFuncs, tsParser.parse(fileInfo.source || fs_1.default.readFileSync(fileInfo.filePath, "utf-8")));
            returnValues.push(...funcNodeToRetun(nodes));
        }
        return returnValues;
    };
    return { parse };
}
exports.default = parser;
