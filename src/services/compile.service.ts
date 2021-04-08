import { SymlObject } from "../types/syntax";
import { ObjectOf } from "../types/common.types";
import { cloneDeepWith, omit } from "lodash";
import { isString, mapKeysDeep } from "../utils/general.utils";
import { extractTypeName } from "../utils/syntax.utils";
import { SamlTypeFormatter } from "../models/saml-type-formatter";

export class CompileService {
  public static compileSaml(symlObject: SymlObject): ObjectOf<any> {
    const { _types } = symlObject;

    const formattedYaml = cloneDeepWith<object>(
      omit(symlObject, ["_types"]),
      (value, key) => {
        if (isString(key)) {
          const extractedTypeName = extractTypeName(key);
          if (extractedTypeName.type)
            return SamlTypeFormatter.formatTemplate(
              _types[extractedTypeName.type],
              value
            );
        }
      }
    );
    return mapKeysDeep(
      formattedYaml,
      (_, key) => extractTypeName(key).clientKey
    );
  }
}
