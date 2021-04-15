"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompileService = void 0;
const lodash_1 = require("lodash");
const general_utils_1 = require("../utils/general.utils");
const syntax_utils_1 = require("../utils/syntax.utils");
const saml_type_formatter_1 = require("../models/saml-type-formatter");
class CompileService {
    static compileSaml(clientData, types = {}) {
        const formattedYaml = lodash_1.cloneDeepWith(clientData, (value, key) => {
            if (general_utils_1.isString(key)) {
                const extractedTypeName = syntax_utils_1.extractTypeName(key);
                if (extractedTypeName.type)
                    return saml_type_formatter_1.SamlTypeFormatter.formatTemplate(types[extractedTypeName.type], value);
            }
        });
        return general_utils_1.mapKeysDeep(formattedYaml, (_, key) => syntax_utils_1.extractTypeName(key).clientKey);
    }
}
exports.CompileService = CompileService;
