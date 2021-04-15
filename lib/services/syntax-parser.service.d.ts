import { SymlObject, SymlSyntax } from "../types/syntax";
export declare class SyntaxParserService {
    private static extractImport;
    private static extractTypes;
    private static extractClientData;
    static parseSyntax(syml: SymlSyntax): SymlObject;
}
