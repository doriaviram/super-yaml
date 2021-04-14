import { dump, load } from "js-yaml";
import { promises } from "fs";
import { SymlObject, SymlSyntax } from "../types/syntax";
import { SyntaxParserService } from "./syntax-parser.service";
import { ObjectOf } from "../types/common.types";

export class FileSystemService {
  public static async readYaml(path: string): Promise<ObjectOf<any>> {
    const fileContents = await promises.readFile(path, { encoding: "utf8" });
    const yml = load(fileContents);
    if (typeof yml === "object") {
      return yml as ObjectOf<any>;
    }
    throw new Error(`File '${path}' is not valid YAML`);
  }

  public static async readSyml(path: string): Promise<SymlObject> {
    const yaml = await this.readYaml(path);
    return SyntaxParserService.parseSyntax(yaml as SymlSyntax);
  }

  public static async writeYaml(path: string, content: object): Promise<void> {
    const ymlContent = dump(content);
    await promises.writeFile(path, ymlContent, "utf8");
  }
}
