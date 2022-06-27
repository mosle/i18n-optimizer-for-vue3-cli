import * as ts from "typescript";
export declare type FuncNode = {
    node: ts.Node;
    name: string;
    arguments: ReturnType<typeof nodeToLiteral>[];
};
declare type FuncPredicate = {
    name: string;
    argumentIndex: number;
    type: string;
};
export declare const parse: (source: string) => ts.SourceFile;
export declare const nodeToLiteral: (node?: ts.Node) => string | number | undefined;
export declare const findNodesByFuncNames: (funcNames: string[], root: ts.Node, condition?: (node: ts.CallExpression) => boolean) => FuncNode[];
export declare const findNodesByFuncNamesWithArgumentTypes: (predicates: FuncPredicate[], root: ts.Node) => FuncNode[];
export declare const findNodesByMethodNames: (targetFirstInstanceName: string, funcNames: string[], root: ts.Node, condition?: (node: ts.CallExpression) => boolean) => FuncNode[];
export declare const findNodesByMethodNamesWithArgumentTypes: (firstInstanceName: string, predicates: FuncPredicate[], root: ts.Node) => FuncNode[];
export {};
