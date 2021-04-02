import { SymlParam } from "../types/syntax";
import { isString } from "./general.utils";

export const parseParam = (param: any): SymlParam | undefined => {
  if (isString(param) && param.startsWith("$")) {
    const [key, defaultValue] = param.substring(1).split(":");
    return {
      key,
      defaultValue,
    };
  }
  return undefined;
};
