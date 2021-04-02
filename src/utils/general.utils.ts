export const noop = () => {};

export const isNative = (obj: any): boolean =>
  ["number", "string", "bigint", "boolean"].includes(typeof obj);

export const isString = (obj: any): boolean => typeof obj === "string";
