"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeyObjectFromNotations = exports.createObjectOnlyHasPaths = void 0;
const dot_object_1 = __importDefault(require("dot-object"));
function createObjectOnlyHasPaths(from, notations, separator = ".") {
    const dot = new dot_object_1.default(separator);
    const object = Object.fromEntries(notations.map((notation) => [notation, dot.pick(notation, from)]).filter((pair) => pair[1]));
    return dot.object(object);
}
exports.createObjectOnlyHasPaths = createObjectOnlyHasPaths;
function createKeyObjectFromNotations(notations) {
    return Object.fromEntries(notations.map((notation) => [notation, notation]));
}
exports.createKeyObjectFromNotations = createKeyObjectFromNotations;
