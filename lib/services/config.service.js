"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const DEFAULT_CONFIG = {
    typeKeyPrefix: "<",
    variablePrefix: "_",
    typeVariablePrefix: "$.",
    typeKeySuffix: ">",
};
class ConfigService {
    static resetConfig() {
        ConfigService.globalConfig = DEFAULT_CONFIG;
    }
    static initConfig(clientConfig = {}) {
        ConfigService.globalConfig = Object.assign(Object.assign({}, ConfigService.globalConfig), clientConfig);
    }
    static getConfig() {
        return ConfigService.globalConfig;
    }
}
exports.ConfigService = ConfigService;
ConfigService.globalConfig = DEFAULT_CONFIG;
