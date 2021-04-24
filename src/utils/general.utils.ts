import { forOwn, isPlainObject } from "lodash";
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
): ObjectOf<any> => {
  if (isNative(obj)) return obj;
  let retValue: any = {};
  forOwn(obj, (value, key) => {
    if (Array.isArray(value))
      value = value.map((v) => mapKeysDeep(v, replacer));
    if (isPlainObject(value)) value = mapKeysDeep(value, replacer);
    retValue[replacer(value, key)] = value;
  });
  return retValue;
};
