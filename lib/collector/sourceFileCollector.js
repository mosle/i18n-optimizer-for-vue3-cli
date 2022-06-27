"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectFunctionArgumentsFromFile = void 0;
const parser_1 = __importDefault(require("../parser/parser"));
function collectFunctionArgumentsFromFile(fileInfo, functions) {
    const nameAndKeys = (0, parser_1.default)(fileInfo, functions).parse();
    return [...nameAndKeys.map((set) => set.key)];
}
exports.collectFunctionArgumentsFromFile = collectFunctionArgumentsFromFile;
