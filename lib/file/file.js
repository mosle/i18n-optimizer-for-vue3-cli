"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOutputPath = exports.outputBulk = exports.output = exports.clearDirectory = exports.extractAll = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
function extractAll(pattern) {
    return glob_1.default.sync(pattern);
}
exports.extractAll = extractAll;
function clearDirectory(directory) {
    fs_extra_1.default.emptyDirSync(directory);
}
exports.clearDirectory = clearDirectory;
function output(fileInfo) {
    fs_extra_1.default.outputFileSync(fileInfo.path, fileInfo.content);
}
exports.output = output;
function outputBulk(fileInfos, directory, extension = ".json") {
    for (const key in fileInfos) {
        const content = fileInfos[key];
        output({ path: `${directory}/${key}${path_1.default.extname(key) ? "" : extension}`, content: content });
    }
}
exports.outputBulk = outputBulk;
function toOutputPath(inputPath, inputDir, outputDir) {
    if (inputPath.indexOf(inputDir) === 0) {
        return `${outputDir}${inputPath.substring(inputDir.length)}`;
    }
    else {
        throw new Error(`${inputDir} is not match.`);
    }
}
exports.toOutputPath = toOutputPath;
