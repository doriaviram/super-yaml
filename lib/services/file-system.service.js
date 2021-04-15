"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemService = void 0;
const js_yaml_1 = require("js-yaml");
const fs_1 = require("fs");
const syntax_parser_service_1 = require("./syntax-parser.service");
class FileSystemService {
    static async readYaml(path) {
        const fileContents = await fs_1.promises.readFile(path, { encoding: "utf8" });
        const yml = js_yaml_1.load(fileContents);
        if (typeof yml === "object") {
            return yml;
        }
        throw new Error(`File '${path}' is not valid YAML`);
    }
    static async readSyml(path) {
        const yaml = await this.readYaml(path);
        return syntax_parser_service_1.SyntaxParserService.parseSyntax(yaml);
    }
    static async writeYaml(path, content) {
        const ymlContent = js_yaml_1.dump(content);
        await fs_1.promises.writeFile(path, ymlContent, "utf8");
    }
}
exports.FileSystemService = FileSystemService;
