import { ConfigService } from "../../src/services/config.service";
import { SymlParam } from "../../src/classes/syml-param.class";

describe("SymlParam", () => {
  it("build => simple param", () => {
    const symlParam = SymlParam.generateFromString("$.name");

    const result = symlParam!.build({ name: "SuperName" });

    expect(result).toStrictEqual("SuperName");
  });

  it("build => simple param with brackets", () => {
    const symlParam = SymlParam.generateFromString("$.{name}");

    const result = symlParam!.build({ name: "SuperName" });

    expect(result).toStrictEqual("SuperName");
  });

  it("build => no-param", () => {
    const symlParam = SymlParam.generateFromString("no-param");

    const result = symlParam!.build({});

    expect(result).toEqual("no-param");
  });

  it("build => param with default value", () => {
    const symlParam = SymlParam.generateFromString("$.name:2");

    const resultWithParam = symlParam!.build({ name: "SuperName" });
    const resultWithoutParam = symlParam!.build({});

    expect(resultWithParam).toStrictEqual("SuperName");
    expect(resultWithoutParam).toStrictEqual("2");
  });

  it("build => custom config", () => {
    ConfigService.initConfig({ typeVariablePrefix: "@@" });
    const symlParam = SymlParam.generateFromString("@@name");

    const result = symlParam!.build({ name: "SuperName" });

    expect(result).toStrictEqual("SuperName");
  });

  it("build => missing param", () => {
    const symlParam = SymlParam.generateFromString("$.name");

    expect(() => {
      symlParam!.build({});
    }).toThrowError(new Error(`Missing 'name' property`));
  });

  it("build => string templates", () => {
    const symlParam = SymlParam.generateFromString("Mr. $.name , Welcome");

    const result = symlParam!.build({ name: "SuperName" });

    expect(result).toStrictEqual("Mr. SuperName , Welcome");
  });

  it("build => multiple string templates", () => {
    const symlParam = SymlParam.generateFromString("Mr. $.name , $.message");

    const result = symlParam!.build({ name: "SuperName", message: "Welcome" });

    expect(result).toStrictEqual("Mr. SuperName , Welcome");
  });

  it("build => string templates with brackets", () => {
    const symlParam = SymlParam.generateFromString("Mr. $.{name}, Welcome");

    const result = symlParam!.build({ name: "SuperName" });

    expect(result).toStrictEqual("Mr. SuperName, Welcome");
  });
});
