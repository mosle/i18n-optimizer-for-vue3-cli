import fs from "fs";
import * as diff from "fast-array-diff";

import Dot from "dot-object";

type Report = {
  reduecedKeys: string[];
  reducedBytes: number;
};

export function createReport(filepathA: string, filepathB: string, separator: string = "."): Report {
  const a: KeyValues = JSON.parse(fs.readFileSync(filepathA, "utf-8"));
  const b: KeyValues = JSON.parse(fs.readFileSync(filepathB, "utf-8"));

  const statA = fs.statSync(filepathA);
  const statB = fs.statSync(filepathB);
  return {
    reduecedKeys: removedKeys({ a, b }, separator),
    reducedBytes: statA.size - statB.size,
  };
}
type Diff = {
  a: KeyValues;
  b: KeyValues;
};

export function removedKeys({ a, b }: Diff, separator: string = ".") {
  const dot = new Dot(separator);
  const keyValueA: KeyVaule = dot.dot(a);
  const keyValueB: KeyVaule = dot.dot(b);
  const result: diff.DiffData<string> = diff.diff(Object.keys(keyValueA), Object.keys(keyValueB));

  return result.removed;
}
