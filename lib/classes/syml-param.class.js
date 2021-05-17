"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymlParam = void 0;
const config_service_1 = require("../services/config.service");
const general_utils_1 = require("../utils/general.utils");
const format = require("string-kit").format;
class SymlParam {
    constructor({ template, keys }) {
        this.template = template;
        this.keys = keys;
    }
    build(userObject) {
        const args = this.keys.map((value) => {
            return {
                key: value.key,
                value: userObject[value.key] || value.defaultValue,
            };
        });
        const missingParam = args.find((arg) => arg.value === undefined);
        if (missingParam) {
            throw new Error(`Missing '${missingParam.key}' property`);
        }
        return format(this.template, ...args.map(({ value }) => value));
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
            template = template.replace(parameter, `%s`);
            keys.push({ key, defaultValue });
        });
        return new SymlParam({ template, keys });
    }
}
exports.SymlParam = SymlParam;
