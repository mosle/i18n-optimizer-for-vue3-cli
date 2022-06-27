"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenKeys = void 0;
const dot_object_1 = __importDefault(require("dot-object"));
function flattenKeys(keyValues) {
    return Object.keys(dot_object_1.default.dot(keyValues));
}
exports.flattenKeys = flattenKeys;
