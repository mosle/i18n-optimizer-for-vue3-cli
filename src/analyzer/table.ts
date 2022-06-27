type Table = Record<string, number>;
export function createTable() {
  return {} as Table;
}

export function add(table: Table, key: string) {
  table[key] ||= 0;
  table[key]++;
}
export function keysOf(table: Table) {
  return Object.keys(table);
}
export function addBulk(table: Table, keys: string[]) {
  keys.forEach((key) => add(table, key));
}
