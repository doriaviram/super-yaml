import { SymlType } from "../types/syntax";
import { ObjectOf } from "../types/common.types";
import { cloneDeepWith } from "lodash";
import { isString, mapKeysDeep } from "../utils/general.utils";
import { extractTypeName } from "../utils/syntax.utils";
import { SamlTypeFormatter } from "../models/saml-type-formatter";

export class CompileService {
  public static compileSaml(
    clientData: ObjectOf<any>,
    types: ObjectOf<SymlType> = {}
  ): ObjectOf<any> {
    const formattedYaml = cloneDeepWith<object>(clientData, (value, key) => {
      if (isString(key)) {
        const extractedTypeName = extractTypeName(key);
        if (extractedTypeName.type)
          return SamlTypeFormatter.formatTemplate(
            types[extractedTypeName.type],
            value
          );
      }
    });
    return mapKeysDeep(
      formattedYaml,
      (_, key) => extractTypeName(key).clientKey
    );
  }
}
