declare type Report = {
    reduecedKeys: string[];
    reducedBytes: number;
};
export declare function createReport(filepathA: string, filepathB: string, separator?: string): Report;
declare type Diff = {
    a: KeyValues;
    b: KeyValues;
};
export declare function removedKeys({ a, b }: Diff, separator?: string): string[];
export {};
