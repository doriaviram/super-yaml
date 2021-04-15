"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const file_system_service_1 = require("../services/file-system.service");
const compile_service_1 = require("../services/compile.service");
const import_service_1 = require("../services/import.service");
class Compile extends command_1.Command {
    async run() {
        const { flags } = this.parse(Compile);
        const { source, target } = flags;
        const syml = await file_system_service_1.FileSystemService.readSyml(source);
        const types = await import_service_1.ImportService.importAllTypes(syml);
        const result = compile_service_1.CompileService.compileSaml(syml.clientData, types);
        await file_system_service_1.FileSystemService.writeYaml(target, result);
    }
}
exports.default = Compile;
Compile.description = "Compile syml to simple yml";
Compile.examples = [
    `$ super-yaml compile -s config.syml -t config.yml`,
    `$ super-yaml compile --source config.syml --target config.yml`,
];
Compile.flags = {
    source: command_1.flags.string({ char: "s", required: true }),
    target: command_1.flags.string({ char: "t", required: true }),
};
