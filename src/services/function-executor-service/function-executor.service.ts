//TODO: Support nested functions
//TODO: Support multiple functions
//TODO: Add tests
import { indexOfOrLength } from "../../utils/general.utils";
import { VarFunction } from "./functions/var.function";
import { ObjectOf } from "../../types/common.types";

export class FunctionExecutorService {
  private static extractParameters(func: string): string[] {
    const startParamIndex = func.indexOf("(");
    const endParamIndex = indexOfOrLength(func, ")", startParamIndex);
    return func.substring(startParamIndex + 1, endParamIndex).split(",");
  }

  private static extractFuncName(func: string): string {
    const startParamIndex = func.indexOf("(");
    return func.substring(0, startParamIndex);
  }

  public static execute(func: string, properties: ObjectOf<any>): any {
    const parameters = this.extractParameters(func);
    const funcName = this.extractFuncName(func);
    if (funcName !== "Var")
      throw Error("Currently only Var function is supported");
    return VarFunction.execute(parameters, properties);
  }
}
