import { ObjectOf } from "../types/common.types";
export declare const noop: () => void;
export declare const isNative: (obj: any) => boolean;
export declare const isString: (obj: any) => obj is string;
declare type mapKeysDeepReplacer = (value: any, key: string) => string;
export declare const mapKeysDeep: (obj: ObjectOf<any>, replacer: mapKeysDeepReplacer) => ObjectOf<any>;
export {};