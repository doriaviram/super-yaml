import { SymlType } from "../types/syntax";
import { isString } from "../utils/general.utils";
import { ObjectOf } from "../types/common.types";
import { cloneDeepWith } from "lodash";
import { SymlParam } from "../classes/syml-param.class";

export class SamlTypeFormatter {
  //TODO: Migrate to service
  public static formatTemplate(
    type: SymlType,
    userObject: ObjectOf<any>
  ): ObjectOf<any> {
    return cloneDeepWith<object>(type.properties, (value) => {
      if (isString(value)) {
        const symlParameter = SymlParam.generateFromString(value);
        return symlParameter.build(userObject);
      }
    });
  }
}
