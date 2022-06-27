import { JSONSchemaType } from "ajv";
export declare type Setting = {
    outputDir: string;
    inputDir: string;
    checkPatterns: string[];
    targetFunctionNames: {
        [key: string]: number;
    };
    argumentSeparator: string;
};
declare const schema: JSONSchemaType<Setting>;
export default schema;
