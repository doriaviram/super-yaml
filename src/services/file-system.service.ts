import { dump, load } from "js-yaml";
import { promises } from "fs";
import { SymlObject } from "../types/syntax";

export class FileSystemService {
  static async readYaml(path: string): Promise<SymlObject> {
    const fileContents = await promises.readFile(path, { encoding: "utf8" });
    const yml = load(fileContents);
    if (typeof yml === "object") {
      return yml as SymlObject;
    }
    throw new Error(`File '${path}' is not valid YAML`);
  }

  static async writeYaml(path: string, content: object): Promise<void> {
    const ymlContent = dump(content);
    await promises.writeFile(path, ymlContent, "utf8");
  }
}
