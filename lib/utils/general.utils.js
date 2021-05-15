"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexOfOrLength = exports.allIndexesOf = exports.mapKeysDeep = exports.isString = exports.isNative = exports.noop = void 0;
const lodash_1 = require("lodash");
const noop = () => { };
exports.noop = noop;
const isNative = (obj) => ["number", "string", "bigint", "boolean"].includes(typeof obj);
exports.isNative = isNative;
const isString = (obj) => typeof obj === "string";
exports.isString = isString;
const mapKeysDeep = (obj, replacer) => {
    if (exports.isNative(obj))
        return obj;
    if (Array.isArray(obj))
        return obj.map((v) => exports.mapKeysDeep(v, replacer));
    let retValue = {};
    lodash_1.forOwn(obj, (value, key) => {
        if (Array.isArray(value))
            value = value.map((v) => exports.mapKeysDeep(v, replacer));
        if (lodash_1.isPlainObject(value))
            value = exports.mapKeysDeep(value, replacer);
        retValue[replacer(value, key)] = value;
    });
    return retValue;
};
exports.mapKeysDeep = mapKeysDeep;
const allIndexesOf = (s, val) => {
    let indexes = [], i = -1;
    while ((i = s.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
};
exports.allIndexesOf = allIndexesOf;
const indexOfOrLength = (base, searchString, position = 0) => {
    const indexOf = base.indexOf(searchString, position);
    return indexOf !== -1 ? indexOf : base.length;
};
exports.indexOfOrLength = indexOfOrLength;
