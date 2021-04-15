import { SyntaxParserService } from "./services/syntax-parser.service";
import { SymlSyntax } from "./types/syntax";
import { CompileService } from "./services/compile.service";
import { load, dump } from "js-yaml";

//TODO: Move from index
export const compile = (yml: string) => {
  const ymlObj = load(yml);
  const parsed = SyntaxParserService.parseSyntax(ymlObj as SymlSyntax);
  const result = CompileService.compileSaml(parsed.clientData, parsed.types);
  return dump(result);
};

export { run } from "@oclif/command";
