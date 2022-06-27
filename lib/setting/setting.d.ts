import { Setting } from "./schema";
export declare function parseSetting(option: Parameters<typeof load>[0]): [Setting | undefined, ErrorResult | undefined];
export declare function load({ jsonFilePath, json }: {
    jsonFilePath: string;
    json?: never;
} | {
    jsonFilePath?: never;
    json: string;
}): any;
declare type ErrorResult = {
    error: boolean;
    messages: {
        keyword: string;
        message?: string;
    }[];
};
declare type SuccessResult = Setting;
export declare function validate(json: any): [SuccessResult | undefined, ErrorResult | undefined];
export declare function toExample(funcNames: Setting["targetFunctionNames"], exampleKeyName?: string): string;
export {};
