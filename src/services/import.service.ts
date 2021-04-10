import { ObjectOf } from "../types/common.types";
import { SymlObject, SymlType } from "../types/syntax";
import { FileSystemService } from "./file-system.service";
import { dirname, resolve } from "path";

export class ImportService {
  public static async importAllTypes(
    root: SymlObject,
    currentPath: string = "./"
  ): Promise<ObjectOf<SymlType>> {
    let types: ObjectOf<SymlType> = root._types || {};

    if (root._import) {
      await Promise.all(
        root._import.map<Promise<void>>(async (path) => {
          const resolvedPath = resolve(currentPath, path);
          const syml = await FileSystemService.readYaml(resolvedPath);
          const typesFromFiles = await ImportService.importAllTypes(
            syml,
            dirname(resolvedPath)
          );
          types = Object.assign({}, typesFromFiles, types);
        })
      );
    }
    return types;
  }
}
