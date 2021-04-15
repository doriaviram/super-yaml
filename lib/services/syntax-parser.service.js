"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxParserService = void 0;
const lodash_1 = require("lodash");
const config_service_1 = require("./config.service");
class SyntaxParserService {
    static extractImport(syml) {
        return syml["@import"] || [];
    }
    static extractTypes(syml) {
        return syml["@types"] || {};
    }
    static extractClientData(syml) {
        const { variablePrefix } = config_service_1.ConfigService.getConfig();
        return lodash_1.pickBy(syml, (value, key) => !key.startsWith(variablePrefix));
    }
    static parseSyntax(syml) {
        return {
            types: this.extractTypes(syml),
            import: this.extractImport(syml),
            clientData: this.extractClientData(syml),
        };
    }
}
exports.SyntaxParserService = SyntaxParserService;
