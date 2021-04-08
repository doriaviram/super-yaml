import { SymlObject } from "../../src/types/syntax";
import { CompileService } from "../../src/services/compile.service";

describe("CompileService", () => {
  it("compileSaml => simple flow", async () => {
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

    const result = CompileService.compileSaml(clientYml);

    expect(result).toStrictEqual({
      TestStudent: {
        name: "SuperName",
        class: "Math",
      },
      DummyStudent: {
        name: "DummyStudent",
      },
    });
  });
});
