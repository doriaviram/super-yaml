//TODO: Add tests
import { ObjectOf } from "../../../types/common.types";

export class VarFunction {
  public static execute(parameters: string[], properties: ObjectOf<any>): any {
    const [key, defaultValue] = parameters;
    if (properties[key] === undefined && defaultValue === undefined) {
      throw new Error(`Missing '${key}' property`);
    }
    return properties[key] || defaultValue;
  }
}
