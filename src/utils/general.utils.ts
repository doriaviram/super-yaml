import { mapValues, mapKeys, isObject } from "lodash";
import { ObjectOf } from "../types/common.types";

export const noop = () => {};

export const isNative = (obj: any): boolean =>
  ["number", "string", "bigint", "boolean"].includes(typeof obj);

export const isString = (obj: any): obj is string => typeof obj === "string";

// eslint-disable-next-line no-unused-vars
type mapKeysDeepReplacer = (value: any, key: string) => string;
export const mapKeysDeep = (
  obj: ObjectOf<any>,
  replacer: mapKeysDeepReplacer
): ObjectOf<any> =>
  mapValues(mapKeys(obj, replacer), (val) =>
    isObject(val) ? mapKeysDeep(val, replacer) : val
  );
