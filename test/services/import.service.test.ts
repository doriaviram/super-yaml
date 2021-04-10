import { SymlObject } from "../../src/types/syntax";
import { ImportService } from "../../src/services/import.service";
import { FileSystemService } from "../../src/services/file-system.service";

describe("Import service", () => {
  it("importAllTypes => empty flow", async () => {
    const clientYml: SymlObject = {
      _types: {
        Student: {
          template: {
            name: "$name",
            class: "Math",
          },
        },
      },
      "TestStudent<Student>": {
        name: "SuperName",
      },
      DummyStudent: {
        name: "DummyStudent",
      },
    };

    const result = await ImportService.importAllTypes(clientYml);

    expect(result).toStrictEqual({
      Student: {
        template: {
          name: "$name",
          class: "Math",
        },
      },
    });
  });

  it("importAllTypes => simple flow", async () => {
    const type1: SymlObject = {
      _types: {
        MathStudent: {
          template: {
            name: "$name",
            class: "Math",
          },
        },
      },
      "TestStudent<Student>": {
        name: "SuperName",
      },
      DummyStudent: {
        name: "DummyStudent",
      },
    };
    await FileSystemService.writeYaml("./math.syml", type1);

    const clientYml: SymlObject = {
      _import: ["./math.syml"],
      _types: {
        GeoStudent: {
          template: {
            name: "$name",
            class: "Geo",
          },
        },
      },
    };

    const result = await ImportService.importAllTypes(clientYml);

    expect(result).toStrictEqual({
      MathStudent: {
        template: {
          name: "$name",
          class: "Math",
        },
      },
      GeoStudent: {
        template: {
          name: "$name",
          class: "Geo",
        },
      },
    });
  });

  it("importAllTypes => nested require", async () => {
    const type1: SymlObject = {
      _types: {
        ChessStudent1: {
          template: {
            name: "$name",
            class: "Math",
          },
        },
        ChessStudent2: {
          template: {
            name: "$name",
            class: "Math",
          },
        },
      },
    };
    const type2: SymlObject = {
      _import: ["./chess.syml"],
      _types: {
        MathStudent: {
          template: {
            name: "$name",
            class: "Math",
          },
        },
      },
    };
    await FileSystemService.writeYaml("./types/chess.syml", type1);
    await FileSystemService.writeYaml("./types/math.syml", type2);

    const clientYml: SymlObject = {
      _import: ["./types/math.syml"],
      _types: {
        GeoStudent: {
          template: {
            name: "$name",
            class: "Geo",
          },
        },
      },
    };

    const result = await ImportService.importAllTypes(clientYml);

    expect(result).toStrictEqual({
      MathStudent: {
        template: {
          name: "$name",
          class: "Math",
        },
      },
      GeoStudent: {
        template: {
          name: "$name",
          class: "Geo",
        },
      },
      ChessStudent1: {
        template: {
          name: "$name",
          class: "Math",
        },
      },
      ChessStudent2: {
        template: {
          name: "$name",
          class: "Math",
        },
      },
    });
  });
});
