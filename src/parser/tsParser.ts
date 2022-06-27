import * as ts from "typescript";

export type FuncNode = {
  node: ts.Node;
  name: string;
  //  arguments: ts.NodeArray<ts.Expression>;
  arguments: ReturnType<typeof nodeToLiteral>[];
};

type FuncPredicate = { name: string; argumentIndex: number; type: string };

export const parse = (source: string) => {
  return ts.createSourceFile("_.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.Unknown);
};

export const nodeToLiteral = (node?: ts.Node): string | number | undefined => {
  if (node) {
    if (ts.isAsExpression(node)) return nodeToLiteral(node.expression);
    if (ts.isStringLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
  }
};
export const findNodesByFuncNames = (funcNames: string[], root: ts.Node, condition: (node: ts.CallExpression) => boolean = (node) => true): FuncNode[] => {
  const nodes: FuncNode[] = [];
  search(root);
  return nodes;

  function search(node: ts.Node) {
    block: {
      if (ts.isCallExpression(node)) {
        if (!ts.isIdentifier(node.expression)) break block;
        const name = node.expression.text;

        if (!funcNames.includes(name)) break block;
        if (condition(node)) {
          nodes.push({
            name: name,
            node: node,
            arguments: node.arguments.map((n) => nodeToLiteral(n)),
          });
        }
        return;
      }
    }
    ts.forEachChild(node, search);
  }
};

export const findNodesByFuncNamesWithArgumentTypes = (predicates: FuncPredicate[], root: ts.Node) => {
  return findNodesByFuncNames(
    Object.entries(predicates).map((pair) => pair[1].name),
    root,
    (node) => {
      const func = predicates.find((func) => func.name === node.expression.getText());
      return func ? typeof nodeToLiteral(node.arguments[func.argumentIndex]) === func.type : false;
    }
  );
};

export const findNodesByMethodNames = (targetFirstInstanceName: string, funcNames: string[], root: ts.Node, condition: (node: ts.CallExpression) => boolean = (node) => true): FuncNode[] => {
  const nodes: FuncNode[] = [];
  search(root);
  return nodes;

  function search(node: ts.Node) {
    block: {
      if (ts.isCallExpression(node)) {
        //ts.SyntaxKind;
        if (!ts.isPropertyAccessExpression(node.expression)) break block;
        if (!ts.isCallExpression(node)) break block;

        const first = node.expression.getChildAt(0);

        if (!ts.isIdentifier(first)) break block;
        if (first.text !== targetFirstInstanceName) break block;

        const last = node.expression.getChildAt(node.expression.getChildCount() - 1);
        if (!ts.isIdentifier(last)) break block;
        const name = last.text;
        if (!funcNames.includes(name)) break block;
        if (condition(node)) {
          nodes.push({
            name: name,
            node: node,
            arguments: node.arguments.map((n) => nodeToLiteral(n)),
          });
        }
        return;
      }
    }
    ts.forEachChild(node, search);
  }
};

export const findNodesByMethodNamesWithArgumentTypes = (firstInstanceName: string, predicates: FuncPredicate[], root: ts.Node) => {
  return findNodesByMethodNames(
    firstInstanceName,
    Object.entries(predicates).map((pair) => pair[1].name),
    root,
    (node) => {
      const expression = node.expression;
      if (!ts.isPropertyAccessExpression(expression)) return false;
      const func = predicates.find((func) => func.name === expression.name.text);

      return func ? typeof nodeToLiteral(node.arguments[func.argumentIndex]) === func.type : false;
    }
  );
};
