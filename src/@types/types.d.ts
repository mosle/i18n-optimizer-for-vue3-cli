export {};

declare global {
  type FunctionType = Record<string, number>;

  type Value = string | number;
  type KeyVaule = Record<string, Value>;
  type KeyValues = Record<string, KeyVaule | Value>;
}
