"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const file_system_service_1 = require("./file-system.service");
const path_1 = require("path");
class ImportService {
    static async importAllTypes(root, currentPath = "./") {
        let types = root.types;
        if (root.import.length) {
            await Promise.all(root.import.map(async (path) => {
                const resolvedPath = path_1.resolve(currentPath, path);
                const syml = await file_system_service_1.FileSystemService.readSyml(resolvedPath);
                const startingPath = path_1.dirname(resolvedPath);
                const typesFromFiles = await ImportService.importAllTypes(syml, startingPath);
                types = Object.assign({}, typesFromFiles, types);
            }));
        }
        return types;
    }
}
exports.ImportService = ImportService;
