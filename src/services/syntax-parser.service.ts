import { pickBy } from "lodash";
import { SymlObject, SymlSyntax, SymlType } from "../types/syntax";
import { ConfigService } from "./config.service";
import { ObjectOf } from "../types/common.types";

export class SyntaxParserService {
  private static extractImport(syml: SymlSyntax): string[] {
    return syml["_import"] || [];
  }

  private static extractTypes(syml: SymlSyntax): ObjectOf<SymlType> {
    return syml["_types"] || {};
  }

  private static extractClientData(syml: SymlSyntax): ObjectOf<any> {
    const { variablePrefix } = ConfigService.getConfig();
    return pickBy(syml, (value, key) => !key.startsWith(variablePrefix));
  }

  public static parseSyntax(syml: SymlSyntax): SymlObject {
    return {
      types: this.extractTypes(syml),
      import: this.extractImport(syml),
      clientData: this.extractClientData(syml),
    };
  }
}
