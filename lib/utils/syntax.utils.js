"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTypeName = void 0;
const config_service_1 = require("../services/config.service");
const extractTypeName = (clientYmlKey) => {
    const { typeKeyPrefix, typeKeySuffix } = config_service_1.ConfigService.getConfig();
    const startIndex = clientYmlKey.indexOf(typeKeyPrefix);
    if (startIndex !== -1 && clientYmlKey.endsWith(typeKeySuffix)) {
        return {
            clientKey: clientYmlKey.substring(0, startIndex),
            type: clientYmlKey.substring(startIndex + typeKeyPrefix.length, clientYmlKey.length - typeKeySuffix.length),
        };
    }
    return { clientKey: clientYmlKey };
};
exports.extractTypeName = extractTypeName;
