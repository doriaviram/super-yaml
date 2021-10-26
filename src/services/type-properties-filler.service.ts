import { SymlType } from "../types/syntax";
import { ObjectOf } from "../types/common.types";
import { cloneDeepWith } from "lodash";
import {
  allIndexesOf,
  indexOfOrLength,
  isString,
} from "../utils/general.utils";
import { ConfigService } from "./config.service";
import { FunctionExecutorService } from "./function-executor-service/function-executor.service";

export class TypePropertiesFillerService {
  private static isStrContainParameter = (value: string) =>
    value.includes(ConfigService.getConfig().typeVariablePrefix);
  private static extractFunctionFromParameter = (parameter: string) => {
    const { typeVariablePrefix, typeVariableSuffix } =
      ConfigService.getConfig();
    return parameter
      .replace(typeVariablePrefix, "")
      .replace(typeVariableSuffix, "")
      .trim();
  };

  private static extractParamsFromString(s: string): string[] {
    const { typeVariablePrefix, typeVariableSuffix } =
      ConfigService.getConfig();
    const paramIndexes = allIndexesOf(s, typeVariablePrefix);
    return paramIndexes.map<string>((paramIndex) => {
      const typeVariableSuffixIndex = indexOfOrLength(
        s,
        typeVariableSuffix,
        paramIndex
      );
      return s
        .substring(
          paramIndex,
          typeVariableSuffixIndex + typeVariableSuffix.length
        )
        .trim();
    });
  }

  public static build(type: SymlType, properties: ObjectOf<any>) {
    return cloneDeepWith<object>(type.properties, (value) => {
      if (isString(value)) {
        if (this.isStrContainParameter(value)) {
          const params = this.extractParamsFromString(value);

          if (params.length === 1 && params[0].trim() === value.trim()) {
            const func = this.extractFunctionFromParameter(params[0]);
            return FunctionExecutorService.execute(func, properties);
          }

          let result: string = value;
          params.forEach((param) => {
            const func = this.extractFunctionFromParameter(param);
            const funcResult = FunctionExecutorService.execute(
              func,
              properties
            );
            if (!isString(funcResult)) {
              throw Error(
                `Cannot format function ${func} as part of a string, it's not a valid string`
              );
            }
            result = result.replace(param, funcResult);
          });
          return result;
        }
      }
    });
  }
}
