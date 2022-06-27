import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
import glob from "glob";

export function extractAll(pattern: string) {
  return glob.sync(pattern);
}

export function clearDirectory(directory: string) {
  fsExtra.emptyDirSync(directory);
}

type FileInfo = {
  path: string;
  content: string;
};
export function output(fileInfo: FileInfo) {
  fsExtra.outputFileSync(fileInfo.path, fileInfo.content);
}
export function outputBulk(fileInfos: { [key in FileInfo["path"]]: FileInfo["content"] }, directory: string, extension: ".json" | ".yml" = ".json") {
  for (const key in fileInfos) {
    const content = fileInfos[key];
    output({ path: `${directory}/${key}${path.extname(key) ? "" : extension}`, content: content });
  }
}

export function toOutputPath(inputPath: string, inputDir: string, outputDir: string): string | never {
  if (inputPath.indexOf(inputDir) === 0) {
    return `${outputDir}${inputPath.substring(inputDir.length)}`;
  } else {
    throw new Error(`${inputDir} is not match.`);
  }
}
