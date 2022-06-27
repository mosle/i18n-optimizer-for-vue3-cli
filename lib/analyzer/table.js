"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBulk = exports.keysOf = exports.add = exports.createTable = void 0;
function createTable() {
    return {};
}
exports.createTable = createTable;
function add(table, key) {
    table[key] ||= 0;
    table[key]++;
}
exports.add = add;
function keysOf(table) {
    return Object.keys(table);
}
exports.keysOf = keysOf;
function addBulk(table, keys) {
    keys.forEach((key) => add(table, key));
}
exports.addBulk = addBulk;
