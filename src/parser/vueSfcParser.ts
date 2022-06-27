import { parse as parseSfc, compileScript, compileTemplate } from "@vue/compiler-sfc";

import fs from "fs";

export const parse = ({ filePath = "_.vue", source }: { filePath?: string; source?: string }) => {
  return parseVue(source || fs.readFileSync(filePath, "utf-8"));
};
export const parseVue = (source: string) => {
  const parsed = parseSfc(source);

  const script = parsed.descriptor.script?.content || parsed.descriptor.scriptSetup?.content ? compileScript(parsed.descriptor, { id: "dummy" }) : undefined;
  const template = parsed.descriptor.template?.content ? compileTemplate({ source: parsed.descriptor.template.content, filename: "temp", id: "temp" }) : undefined;

  return { script, template };
};
