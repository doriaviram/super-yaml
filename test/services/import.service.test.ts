import { ImportService } from "../../src/services/import.service";
import { FileSystemService } from "../../src/services/file-system.service";
import { SymlObjectBuilder } from "../../src/infra/test-utils/builders/syml-object.builder";

describe("Import service", () => {
  it("importAllTypes => empty flow (no types)", async () => {
    const clientYml = new SymlObjectBuilder().build();

    const result = await ImportService.importAllTypes(clientYml);

    expect(result).toStrictEqual({});
  });

  it("importAllTypes => empty flow (no import)", async () => {
    const clientYml = new SymlObjectBuilder().addRandomType().build();

    const result = await ImportService.importAllTypes(clientYml);

    expect(result).toStrictEqual(clientYml.types);
  });

  it("importAllTypes => simple flow", async () => {
    const type1 = new SymlObjectBuilder().addRandomType();
    await FileSystemService.writeYaml(
      "./math.syml",
      type1.buildAsClientSyntax()
    );

    const clientYml = new SymlObjectBuilder()
      .addRandomType()
      .addImport("./math.syml");

    const result = await ImportService.importAllTypes(clientYml.build());

    expect(result).toStrictEqual({
      ...type1.build().types,
      ...clientYml.build().types,
    });
  });

  it("importAllTypes => nested require", async () => {
    const type1 = new SymlObjectBuilder().addRandomType().addRandomType();
    const type2 = new SymlObjectBuilder()
      .addRandomType()
      .addImport("./chess.syml");
    await FileSystemService.writeYaml(
      "./types/chess.syml",
      type1.buildAsClientSyntax()
    );
    await FileSystemService.writeYaml(
      "./types/math.syml",
      type2.buildAsClientSyntax()
    );
    const clientYml = new SymlObjectBuilder()
      .addRandomType()
      .addImport("./types/math.syml");

    const result = await ImportService.importAllTypes(clientYml.build());

    expect(result).toStrictEqual({
      ...type1.build().types,
      ...type2.build().types,
      ...clientYml.build().types,
    });
  });
});
