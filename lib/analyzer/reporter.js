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
exports.removedKeys = exports.createReport = void 0;
const fs_1 = __importDefault(require("fs"));
const diff = __importStar(require("fast-array-diff"));
const dot_object_1 = __importDefault(require("dot-object"));
function createReport(filepathA, filepathB, separator = ".") {
    const a = JSON.parse(fs_1.default.readFileSync(filepathA, "utf-8"));
    const b = JSON.parse(fs_1.default.readFileSync(filepathB, "utf-8"));
    const statA = fs_1.default.statSync(filepathA);
    const statB = fs_1.default.statSync(filepathB);
    return {
        reduecedKeys: removedKeys({ a, b }, separator),
        reducedBytes: statA.size - statB.size,
    };
}
exports.createReport = createReport;
function removedKeys({ a, b }, separator = ".") {
    const dot = new dot_object_1.default(separator);
    const keyValueA = dot.dot(a);
    const keyValueB = dot.dot(b);
    const result = diff.diff(Object.keys(keyValueA), Object.keys(keyValueB));
    return result.removed;
}
exports.removedKeys = removedKeys;
