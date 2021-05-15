"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymlParam = void 0;
const config_service_1 = require("../services/config.service");
const general_utils_1 = require("../utils/general.utils");
const string_format_1 = require("string-format");
const format = string_format_1.create({});
class SymlParam {
    constructor({ template, keys }) {
        this.template = template;
        this.keys = keys;
    }
    static escapeKey(key) {
        return `__${key}`;
    }
    build(userObject) {
        this.keys.forEach((key) => {
            if (!userObject[key.key]) {
                if (key.defaultValue) {
                    userObject[key.key] = key.defaultValue;
                }
                else {
                    throw new Error(`Missing '${key.key}' property`);
                }
            }
        });
        const args = general_utils_1.mapKeysDeep(userObject, (value, key) => SymlParam.escapeKey(key));
        return format(this.template, args);
    }
    static extractParamsFromString(s) {
        const { typeVariablePrefix } = config_service_1.ConfigService.getConfig();
        const paramIndexes = general_utils_1.allIndexesOf(s, typeVariablePrefix);
        return paramIndexes.map((paramIndex) => {
            const hasBrackets = s.charAt(paramIndex + typeVariablePrefix.length) === "{";
            const closeChar = hasBrackets ? "}" : " ";
            const closeCharIndex = general_utils_1.indexOfOrLength(s, closeChar, paramIndex);
            return s.substring(paramIndex, hasBrackets ? closeCharIndex + 1 : closeCharIndex);
        });
    }
    static generateFromString(s) {
        const { typeVariablePrefix } = config_service_1.ConfigService.getConfig();
        let template = s;
        let keys = [];
        SymlParam.extractParamsFromString(s).forEach((parameter) => {
            const [key, defaultValue] = parameter
                .substring(typeVariablePrefix.length)
                .replace("{", "")
                .replace("}", "")
                .split(":");
            template = template.replace(parameter, `{${SymlParam.escapeKey(key)}}`);
            keys.push({ key, defaultValue });
        });
        return new SymlParam({ template, keys });
    }
}
exports.SymlParam = SymlParam;
