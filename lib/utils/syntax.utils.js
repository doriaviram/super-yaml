"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTypeName = exports.parseParam = void 0;
const general_utils_1 = require("./general.utils");
const config_service_1 = require("../services/config.service");
const parseParam = (param) => {
    if (general_utils_1.isString(param) && param.startsWith("$")) {
        const [key, defaultValue] = param.substring(1).split(":");
        return {
            key,
            defaultValue,
        };
    }
    return undefined;
};
exports.parseParam = parseParam;
const extractTypeName = (clientYmlKey) => {
    const { customerYmlKeyPrefix, customerYmlKeySuffix, } = config_service_1.ConfigService.getConfig();
    const startIndex = clientYmlKey.indexOf(customerYmlKeyPrefix);
    if (startIndex !== -1 && clientYmlKey.endsWith(customerYmlKeySuffix)) {
        return {
            clientKey: clientYmlKey.substring(0, startIndex),
            type: clientYmlKey.substring(startIndex + customerYmlKeyPrefix.length, clientYmlKey.length - customerYmlKeySuffix.length),
        };
    }
    return { clientKey: clientYmlKey };
};
exports.extractTypeName = extractTypeName;
