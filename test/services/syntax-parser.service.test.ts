import { SymlObject, SymlSyntax } from "../../src/types/syntax";
import { SyntaxParserService } from "../../src/services/syntax-parser.service";

describe("SyntaxParserService", () => {
  it("parseSyntax => empty flow", async () => {
    const clientSyml: SymlSyntax = {};

    const result = await SyntaxParserService.parseSyntax(clientSyml);

    expect(result).toStrictEqual<SymlObject>({
      clientData: {},
      import: [],
      types: {},
    });
  });

  it("parseSyntax => simple flow", async () => {
    const clientSyml: SymlSyntax = {
      "@types": {
        Type1: {
          properties: {
            name: "$name",
          },
        },
      },
      "@import": ["./yml.yml"],
    };

    const result = await SyntaxParserService.parseSyntax(clientSyml);

    expect(result).toStrictEqual<SymlObject>({
      types: {
        Type1: {
          properties: {
            name: "$name",
          },
        },
      },
      import: ["./yml.yml"],
      clientData: {},
    });
  });
});
