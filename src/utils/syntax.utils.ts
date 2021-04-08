import { ClientYmlKey, SymlParam } from "../types/syntax";
import { isString } from "./general.utils";
import { ConfigService } from "../services/config.service";

export const parseParam = (param: any): SymlParam | undefined => {
  if (isString(param) && param.startsWith("$")) {
    const [key, defaultValue] = param.substring(1).split(":");
    return {
      key,
      defaultValue,
    };
  }
  return undefined;
};

export const extractTypeName = (clientYmlKey: string): ClientYmlKey => {
  const {
    customerYmlKeyPrefix,
    customerYmlKeySuffix,
  } = ConfigService.getConfig();
  const startIndex = clientYmlKey.indexOf(customerYmlKeyPrefix);
  if (startIndex !== -1 && clientYmlKey.endsWith(customerYmlKeySuffix)) {
    return {
      clientKey: clientYmlKey.substring(0, startIndex),
      type: clientYmlKey.substring(
        startIndex + customerYmlKeyPrefix.length,
        clientYmlKey.length - customerYmlKeySuffix.length
      ),
    };
  }
  return { clientKey: clientYmlKey };
};
