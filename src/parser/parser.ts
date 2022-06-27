import * as vueSfcParser from "./vueSfcParser";
import * as tsParser from "./tsParser";
import fs from "fs";

export default function parser(fileInfo: { filePath: string; source?: string }, functions: FunctionType) {
  type T = { name: keyof typeof functions; key: string };
  const funcNodeToRetun = (nodes: tsParser.FuncNode[]) => {
    return nodes.map((node) => ({ name: node.name, key: node.arguments[functions[node.name]] as string }));
  };
  const parse = (): T[] => {
    const searchFuncs = Object.entries(functions).map((pair) => ({ name: pair[0], argumentIndex: pair[1], type: typeof String() }));
    const returnValues: T[] = [];

    if (fileInfo.filePath.endsWith(".vue")) {
      const { script, template } = vueSfcParser.parse(fileInfo);
      if (script) {
        const nodes = tsParser.findNodesByFuncNamesWithArgumentTypes(searchFuncs, tsParser.parse(script.content));
        returnValues.push(...funcNodeToRetun(nodes));
      }

      if (template) {
        const nodes = tsParser.findNodesByMethodNamesWithArgumentTypes("_ctx", searchFuncs, tsParser.parse(template.code));
        returnValues.push(...funcNodeToRetun(nodes));
      }
    } else if (fileInfo.filePath.endsWith(".ts") || fileInfo.filePath.endsWith(".js")) {
      const nodes = tsParser.findNodesByFuncNamesWithArgumentTypes(searchFuncs, tsParser.parse(fileInfo.source || fs.readFileSync(fileInfo.filePath, "utf-8")));
      returnValues.push(...funcNodeToRetun(nodes));
    }
    return returnValues;
  };
  return { parse };
}
