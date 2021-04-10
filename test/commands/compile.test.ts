import Compile from "../../src/commands/compile";
import { FileSystemService } from "../../src/services/file-system.service";
import { SymlObject } from "../../src/types/syntax";
import { ConsoleMock } from "../../src/infra/test-utils/mockers/console.mock";

describe("compile", () => {
  it("compile => simple flow", async () => {
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
    await FileSystemService.writeYaml("test.syml", clientYml);

    await Compile.run(["--source", "test.syml", "--target", "test.yml"]);

    const result = await FileSystemService.readYaml("test.yml");
    const consoleCalls = ConsoleMock.getInstance().getCalls();
    expect(result).toStrictEqual({
      TestStudent: {
        name: "SuperName",
        class: "Math",
      },
      DummyStudent: {
        name: "DummyStudent",
      },
    });
    expect(consoleCalls).toEqual([]);
  });

  it("compile => no types", async () => {
    const clientYml: SymlObject = {
      DummyStudent: {
        name: "DummyStudent",
      },
    };
    await FileSystemService.writeYaml("test.syml", clientYml);

    await Compile.run(["--source", "test.syml", "--target", "test.yml"]);

    const result = await FileSystemService.readYaml("test.yml");
    const consoleCalls = ConsoleMock.getInstance().getCalls();
    expect(result).toStrictEqual({
      DummyStudent: {
        name: "DummyStudent",
      },
    });
    expect(consoleCalls).toEqual([]);
  });

  it("compile => require types", async () => {
    const typesYml: SymlObject = {
      _types: {
        Student: {
          template: {
            name: "$name",
            class: "Math",
          },
        },
      },
    };
    const clientYml: SymlObject = {
      _import: ["./types.syml"],
      "TestStudent<Student>": {
        name: "SuperName",
      },
      DummyStudent: {
        name: "DummyStudent",
      },
    };
    await FileSystemService.writeYaml("./types.syml", typesYml);
    await FileSystemService.writeYaml("./test.syml", clientYml);

    await Compile.run(["--source", "./test.syml", "--target", "./test.yml"]);

    const result = await FileSystemService.readYaml("test.yml");
    const consoleCalls = ConsoleMock.getInstance().getCalls();
    expect(result).toStrictEqual({
      TestStudent: {
        name: "SuperName",
        class: "Math",
      },
      DummyStudent: {
        name: "DummyStudent",
      },
    });
    expect(consoleCalls).toEqual([]);
  });
});
