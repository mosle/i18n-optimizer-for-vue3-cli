import parser from "../parser/parser";

export function collectFunctionArgumentsFromFile(fileInfo: { filePath: string; source?: string }, functions: FunctionType): string[] {
  const nameAndKeys = parser(fileInfo, functions).parse();
  return [...nameAndKeys.map((set) => set.key)];
}
