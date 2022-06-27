import dot from "dot-object";

export function flattenKeys(keyValues: KeyValues): string[] {
  return Object.keys(dot.dot(keyValues));
}
