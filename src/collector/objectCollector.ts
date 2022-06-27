import Dot from "dot-object";

export function createObjectOnlyHasPaths(from: KeyValues, notations: string[], separator: string = ".") {
  const dot = new Dot(separator);
  const object = Object.fromEntries(notations.map((notation) => [notation, dot.pick(notation, from)]).filter((pair) => pair[1]));
  return dot.object(object) as KeyValues;
}

export function createKeyObjectFromNotations<T extends readonly string[]>(notations: T) {
  return Object.fromEntries(notations.map((notation) => [notation, notation])) as { [key in T[number]]: T[number] };
}
