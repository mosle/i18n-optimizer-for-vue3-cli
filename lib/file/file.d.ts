export declare function extractAll(pattern: string): string[];
export declare function clearDirectory(directory: string): void;
declare type FileInfo = {
    path: string;
    content: string;
};
export declare function output(fileInfo: FileInfo): void;
export declare function outputBulk(fileInfos: {
    [key in FileInfo["path"]]: FileInfo["content"];
}, directory: string, extension?: ".json" | ".yml"): void;
export declare function toOutputPath(inputPath: string, inputDir: string, outputDir: string): string | never;
export {};
