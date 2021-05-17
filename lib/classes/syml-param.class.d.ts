import { ObjectOf } from "../types/common.types";
export declare class SymlParam {
    private readonly template;
    private readonly keys;
    private constructor();
    build(userObject: ObjectOf<any>): string;
    private static extractParamsFromString;
    static generateFromString(s: string): SymlParam;
}
