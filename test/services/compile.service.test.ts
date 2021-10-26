import { SymlObject } from "../../src/types/syntax";
import { CompileService } from "../../src/services/compile.service";
import { ObjectOf } from "../../src/types/common.types";
import { SymlObjectBuilder } from "../../src/infra/test-utils/builders/syml-object.builder";

describe("CompileService", () => {
  it("compileSaml => simple flow", async () => {
    const clientYml: SymlObject = new SymlObjectBuilder()
      .types({
        Student: {
          properties: {
            name: "<% Var(name) %>",
            class: "Math",
          },
        },
      })
      .clientData({
        "TestStudent<Student>": {
          name: "SuperName",
        },
        DummyStudent: {
          name: "DummyStudent",
        },
      })
      .build();

    const result = CompileService.compileSaml(
      clientYml.clientData,
      clientYml.types
    );

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

  it("compileSaml => no types", async () => {
    const clientData: ObjectOf<any> = {
      TestStudent: {
        name: "SuperName",
      },
      DummyStudent: {
        name: "DummyStudent",
      },
    };

    const result = CompileService.compileSaml(clientData);

    expect(result).toStrictEqual(clientData);
  });

  it("compileSaml => object inside list (no types)", async () => {
    const clientData: ObjectOf<any> = {
      TestStudents: [
        {
          name: "SuperName1",
        },
        {
          name: "SuperName2",
        },
      ],
    };

    const result = CompileService.compileSaml(clientData);

    expect(result).toStrictEqual(clientData);
  });

  it("compileSaml => object as a variable => simple flow", async () => {
    const clientYml: SymlObject = new SymlObjectBuilder()
      .types({
        Student: {
          properties: {
            name: "<% Var(name) %>",
            class: "Math",
          },
        },
      })
      .clientData({
        "TestStudent<Student>": {
          name: {
            myName: "Name",
          },
        },
      })
      .build();

    const result = CompileService.compileSaml(
      clientYml.clientData,
      clientYml.types
    );

    expect(result).toStrictEqual({
      TestStudent: {
        name: {
          myName: "Name",
        },
        class: "Math",
      },
    });
  });

  it("compileSaml => object as a variable => multiple keys", async () => {
    const clientYml: SymlObject = new SymlObjectBuilder()
      .types({
        Student: {
          properties: {
            name: "<% Var(name1) %> + <% Var(name2) %>",
            class: "Math",
          },
        },
      })
      .clientData({
        "TestStudent<Student>": {
          name1: {
            myName: "Name",
          },
          name2: {
            myName: "Name",
          },
        },
      })
      .build();

    expect(() => {
      CompileService.compileSaml(clientYml.clientData, clientYml.types);
    }).toThrowError(
      new Error(
        `Cannot format function Var(name1) as part of a string, it's not a valid string`
      )
    );
  });
});
