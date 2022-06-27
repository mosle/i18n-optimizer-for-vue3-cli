declare type Table = Record<string, number>;
export declare function createTable(): Table;
export declare function add(table: Table, key: string): void;
export declare function keysOf(table: Table): string[];
export declare function addBulk(table: Table, keys: string[]): void;
export {};
