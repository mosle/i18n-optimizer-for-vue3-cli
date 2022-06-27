"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNodesByMethodNamesWithArgumentTypes = exports.findNodesByMethodNames = exports.findNodesByFuncNamesWithArgumentTypes = exports.findNodesByFuncNames = exports.nodeToLiteral = exports.parse = void 0;
const ts = __importStar(require("typescript"));
const parse = (source) => {
    return ts.createSourceFile("_.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.Unknown);
};
exports.parse = parse;
const nodeToLiteral = (node) => {
    if (node) {
        if (ts.isAsExpression(node))
            return (0, exports.nodeToLiteral)(node.expression);
        if (ts.isStringLiteral(node))
            return node.text;
        if (ts.isNumericLiteral(node))
            return Number(node.text);
    }
};
exports.nodeToLiteral = nodeToLiteral;
const findNodesByFuncNames = (funcNames, root, condition = (node) => true) => {
    const nodes = [];
    search(root);
    return nodes;
    function search(node) {
        block: {
            if (ts.isCallExpression(node)) {
                if (!ts.isIdentifier(node.expression))
                    break block;
                const name = node.expression.text;
                if (!funcNames.includes(name))
                    break block;
                if (condition(node)) {
                    nodes.push({
                        name: name,
                        node: node,
                        arguments: node.arguments.map((n) => (0, exports.nodeToLiteral)(n)),
                    });
                }
                return;
            }
        }
        ts.forEachChild(node, search);
    }
};
exports.findNodesByFuncNames = findNodesByFuncNames;
const findNodesByFuncNamesWithArgumentTypes = (predicates, root) => {
    return (0, exports.findNodesByFuncNames)(Object.entries(predicates).map((pair) => pair[1].name), root, (node) => {
        const func = predicates.find((func) => func.name === node.expression.getText());
        return func ? typeof (0, exports.nodeToLiteral)(node.arguments[func.argumentIndex]) === func.type : false;
    });
};
exports.findNodesByFuncNamesWithArgumentTypes = findNodesByFuncNamesWithArgumentTypes;
const findNodesByMethodNames = (targetFirstInstanceName, funcNames, root, condition = (node) => true) => {
    const nodes = [];
    search(root);
    return nodes;
    function search(node) {
        block: {
            if (ts.isCallExpression(node)) {
                //ts.SyntaxKind;
                if (!ts.isPropertyAccessExpression(node.expression))
                    break block;
                if (!ts.isCallExpression(node))
                    break block;
                const first = node.expression.getChildAt(0);
                if (!ts.isIdentifier(first))
                    break block;
                if (first.text !== targetFirstInstanceName)
                    break block;
                const last = node.expression.getChildAt(node.expression.getChildCount() - 1);
                if (!ts.isIdentifier(last))
                    break block;
                const name = last.text;
                if (!funcNames.includes(name))
                    break block;
                if (condition(node)) {
                    nodes.push({
                        name: name,
                        node: node,
                        arguments: node.arguments.map((n) => (0, exports.nodeToLiteral)(n)),
                    });
                }
                return;
            }
        }
        ts.forEachChild(node, search);
    }
};
exports.findNodesByMethodNames = findNodesByMethodNames;
const findNodesByMethodNamesWithArgumentTypes = (firstInstanceName, predicates, root) => {
    return (0, exports.findNodesByMethodNames)(firstInstanceName, Object.entries(predicates).map((pair) => pair[1].name), root, (node) => {
        const expression = node.expression;
        if (!ts.isPropertyAccessExpression(expression))
            return false;
        const func = predicates.find((func) => func.name === expression.name.text);
        return func ? typeof (0, exports.nodeToLiteral)(node.arguments[func.argumentIndex]) === func.type : false;
    });
};
exports.findNodesByMethodNamesWithArgumentTypes = findNodesByMethodNamesWithArgumentTypes;
