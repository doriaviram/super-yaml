"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlTypeFormatter = void 0;
const general_utils_1 = require("../utils/general.utils");
const lodash_1 = require("lodash");
const syml_param_class_1 = require("../classes/syml-param.class");
class SamlTypeFormatter {
    //TODO: Migrate to service
    static formatTemplate(type, userObject) {
        return lodash_1.cloneDeepWith(type.properties, (value) => {
            if (general_utils_1.isString(value)) {
                const symlParameter = syml_param_class_1.SymlParam.generateFromString(value);
                return symlParameter.build(userObject);
            }
        });
    }
}
exports.SamlTypeFormatter = SamlTypeFormatter;
