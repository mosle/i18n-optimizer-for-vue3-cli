"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseVue = exports.parse = void 0;
const compiler_sfc_1 = require("@vue/compiler-sfc");
const fs_1 = __importDefault(require("fs"));
const parse = ({ filePath = "_.vue", source }) => {
    return (0, exports.parseVue)(source || fs_1.default.readFileSync(filePath, "utf-8"));
};
exports.parse = parse;
const parseVue = (source) => {
    const parsed = (0, compiler_sfc_1.parse)(source);
    const script = parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content ? (0, compiler_sfc_1.compileScript)(parsed.descriptor, { id: "dummy" }) : undefined;
    const template = parsed.descriptor.template?.content ? (0, compiler_sfc_1.compileTemplate)({ source: parsed.descriptor.template.content, filename: "temp", id: "temp" }) : undefined;
    return { script, template };
};
exports.parseVue = parseVue;
