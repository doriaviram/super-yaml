"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const js_yaml_1 = require("js-yaml");
const syntax_parser_service_1 = require("./services/syntax-parser.service");
const compile_service_1 = require("./services/compile.service");
const compile = (yml) => {
    const ymlObj = js_yaml_1.load(yml);
    const parsed = syntax_parser_service_1.SyntaxParserService.parseSyntax(ymlObj);
    const result = compile_service_1.CompileService.compileSaml(parsed.clientData, parsed.types);
    return js_yaml_1.dump(result);
};
exports.compile = compile;
