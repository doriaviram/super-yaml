import { ClientYmlKey, SymlParam } from "../types/syntax";
import { isString } from "./general.utils";
import { ConfigService } from "../services/config.service";

export const parseParam = (param: any): SymlParam | undefined => {
  const { typeVariablePrefix } = ConfigService.getConfig();
  if (isString(param) && param.startsWith(typeVariablePrefix)) {
    const [key, defaultValue] = param
      .substring(typeVariablePrefix.length)
      .split(":");
    return {
      key,
      defaultValue,
    };
  }
  return undefined;
};

export const extractTypeName = (clientYmlKey: string): ClientYmlKey => {
  const { typeKeyPrefix, typeKeySuffix } = ConfigService.getConfig();
  const startIndex = clientYmlKey.indexOf(typeKeyPrefix);
  if (startIndex !== -1 && clientYmlKey.endsWith(typeKeySuffix)) {
    return {
      clientKey: clientYmlKey.substring(0, startIndex),
      type: clientYmlKey.substring(
        startIndex + typeKeyPrefix.length,
        clientYmlKey.length - typeKeySuffix.length
      ),
    };
  }
  return { clientKey: clientYmlKey };
};
