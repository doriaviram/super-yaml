"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const DEFAULT_CONFIG = {
    customerYmlKeyPrefix: "<",
    variablePrefix: "_",
    customerYmlKeySuffix: ">",
};
class ConfigService {
    static initConfig(clientConfig = {}) {
        ConfigService.globalConfig = Object.assign(Object.assign({}, DEFAULT_CONFIG), clientConfig);
    }
    static getConfig() {
        return ConfigService.globalConfig;
    }
}
exports.ConfigService = ConfigService;
ConfigService.globalConfig = DEFAULT_CONFIG;
