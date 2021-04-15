"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlTypeFormatter = void 0;
const syntax_utils_1 = require("../utils/syntax.utils");
const general_utils_1 = require("../utils/general.utils");
const lodash_1 = require("lodash");
class SamlTypeFormatter {
    //TODO: Migrate to service
    static formatTemplate(type, userObject) {
        return lodash_1.cloneDeepWith(type.properties, (value) => {
            if (general_utils_1.isString(value)) {
                const symlParameter = syntax_utils_1.parseParam(value);
                if (symlParameter) {
                    if (!userObject[symlParameter.key] && !symlParameter.defaultValue)
                        throw new Error(`Missing '${symlParameter.key}' property`);
                    return userObject[symlParameter.key] || symlParameter.defaultValue;
                }
            }
        });
    }
}
exports.SamlTypeFormatter = SamlTypeFormatter;
