import { SymlType } from "../types/syntax";
import { parseParam } from "../utils/syntax.utils";

export class SamlTypeFormatter {
  private readonly types: {
    [key: string]: {
      defaultValue?: string;
      key?: string;
    };
  } = {};

  constructor(type: SymlType) {
    this.types = {};
    Object.keys(type.template).forEach((key) => {
      const symlParameter = parseParam(type.template[key]);
      if (symlParameter) {
        this.types[key] = {
          defaultValue: symlParameter.defaultValue,
          key: symlParameter.key,
        };
      } else {
        this.types[key] = {
          defaultValue: type.template[key],
        };
      }
    });
  }

  build(obj: { [key: string]: any }): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    Object.entries(this.types).forEach(([key, value]) => {
      result[key] = value.defaultValue;
      if (value.key) {
        if (obj[value.key]) {
          result[key] = obj[value.key];
        } else {
          if (!result[key]) {
            throw new Error(`Missing '${value.key}' parameter`);
          }
        }
      }
    });
    return result;
  }
}
