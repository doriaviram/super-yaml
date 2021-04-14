import { ObjectOf } from "../types/common.types";
import { SymlObject, SymlType } from "../types/syntax";
import { FileSystemService } from "./file-system.service";
import { dirname, resolve } from "path";

export class ImportService {
  public static async importAllTypes(
    root: SymlObject,
    currentPath: string = "./"
  ): Promise<ObjectOf<SymlType>> {
    let types: ObjectOf<SymlType> = root.types;

    if (root.import.length) {
      await Promise.all(
        root.import.map<Promise<void>>(async (path) => {
          const resolvedPath = resolve(currentPath, path);
          const syml = await FileSystemService.readSyml(resolvedPath);
          const startingPath = dirname(resolvedPath);
          const typesFromFiles = await ImportService.importAllTypes(
            syml,
            startingPath
          );
          types = Object.assign({}, typesFromFiles, types);
        })
      );
    }
    return types;
  }
}
