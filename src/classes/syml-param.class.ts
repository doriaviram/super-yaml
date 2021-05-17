import { ConfigService } from "../services/config.service";
import { allIndexesOf, indexOfOrLength } from "../utils/general.utils";
import { ObjectOf } from "../types/common.types";

const format = require("string-kit").format;

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

  build(userObject: ObjectOf<any>): string {
    const args = this.keys.map((value) => {
      return {
        key: value.key,
        value: userObject[value.key] || value.defaultValue,
      };
    });
    const missingParam = args.find((arg) => arg.value === undefined);
    if (missingParam) {
      throw new Error(`Missing '${missingParam.key}' property`);
    }
    return format(this.template, ...args.map(({ value }) => value));
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
      template = template.replace(parameter, `%s`);
      keys.push({ key, defaultValue });
    });

    return new SymlParam({ template, keys });
  }
}
