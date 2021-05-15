import { ClientYmlKey } from "../types/syntax";
import { ConfigService } from "../services/config.service";

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
