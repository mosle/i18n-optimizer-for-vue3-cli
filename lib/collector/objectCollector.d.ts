export declare function createObjectOnlyHasPaths(from: KeyValues, notations: string[], separator?: string): KeyValues;
export declare function createKeyObjectFromNotations<T extends readonly string[]>(notations: T): { [key in T[number]]: T[number]; };
