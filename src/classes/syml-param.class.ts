import { ConfigService } from "../services/config.service";
import {
  allIndexesOf,
  indexOfOrLength,
  mapKeysDeep,
} from "../utils/general.utils";
import { ObjectOf } from "../types/common.types";
import { create } from "string-format";
const format = create({});

interface SymlParamConstructor {
  template: string;
  keys: SymlParamKey[];
}

interface SymlParamKey {
  key: string;
  defaultValue?: string | undefined;
}

export class SymlParam {
  private readonly template: string;
  private readonly keys: SymlParamKey[];

  private constructor({ template, keys }: SymlParamConstructor) {
    this.template = template;
    this.keys = keys;
  }

  private static escapeKey(key: string): string {
    return `__${key}`;
  }

  build(userObject: ObjectOf<any>): string {
    this.keys.forEach((key) => {
      if (!userObject[key.key]) {
        if (key.defaultValue) {
          userObject[key.key] = key.defaultValue;
        } else {
          throw new Error(`Missing '${key.key}' property`);
        }
      }
    });
    const args = mapKeysDeep(userObject, (value, key) =>
      SymlParam.escapeKey(key)
    );
    return format(this.template, args);
  }

  private static extractParamsFromString(s: string): string[] {
    const { typeVariablePrefix } = ConfigService.getConfig();
    const paramIndexes = allIndexesOf(s, typeVariablePrefix);
    return paramIndexes.map<string>((paramIndex) => {
      const hasBrackets =
        s.charAt(paramIndex + typeVariablePrefix.length) === "{";
      const closeChar = hasBrackets ? "}" : " ";
      const closeCharIndex = indexOfOrLength(s, closeChar, paramIndex);
      return s.substring(
        paramIndex,
        hasBrackets ? closeCharIndex + 1 : closeCharIndex
      );
    });
  }

  static generateFromString(s: string): SymlParam {
    const { typeVariablePrefix } = ConfigService.getConfig();
    let template = s;
    let keys: SymlParamKey[] = [];

    SymlParam.extractParamsFromString(s).forEach((parameter) => {
      const [key, defaultValue] = parameter
        .substring(typeVariablePrefix.length)
        .replace("{", "")
        .replace("}", "")
        .split(":");
      template = template.replace(parameter, `{${SymlParam.escapeKey(key)}}`);
      keys.push({ key, defaultValue });
    });

    return new SymlParam({ template, keys });
  }
}
