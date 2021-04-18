import { extractTypeName, parseParam } from "../../src/utils/syntax.utils";
import { ClientYmlKey } from "../../src/types/syntax";
import { ConfigService } from "../../src/services/config.service";

describe("syntax.utils", () => {
  it("parseParam => param", () => {
    expect(parseParam("$.name")).toStrictEqual({
      key: "name",
      defaultValue: undefined,
    });
  });

  it("parseParam => no-param", () => {
    expect(parseParam("no-param")).toBeUndefined();
  });

  it("parseParam => param with default value", () => {
    expect(parseParam("$.name:2")).toStrictEqual({
      key: "name",
      defaultValue: "2",
    });
  });

  it("parseParam => custom config", () => {
    ConfigService.initConfig({ typeVariablePrefix: "@@" });
    expect(parseParam("@@name")).toStrictEqual({
      key: "name",
      defaultValue: undefined,
    });
  });

  it("extractTypeName => simple flow", () => {
    expect<ClientYmlKey>(extractTypeName("SomeKey<SuperType>")).toStrictEqual({
      clientKey: "SomeKey",
      type: "SuperType",
    });
  });

  it("extractTypeName => without type", () => {
    expect<ClientYmlKey>(extractTypeName("SomeKey")).toStrictEqual({
      clientKey: "SomeKey",
    });
  });

  it("extractTypeName => custom config", () => {
    ConfigService.initConfig({
      typeKeyPrefix: "$$",
      typeKeySuffix: "%%",
    });
    expect<ClientYmlKey>(extractTypeName("SomeKey$$SuperType%%")).toStrictEqual(
      {
        clientKey: "SomeKey",
        type: "SuperType",
      }
    );
  });

  it("extractTypeName => custom config => same string", () => {
    ConfigService.initConfig({
      typeKeyPrefix: "$$",
      typeKeySuffix: "$$",
    });
    expect<ClientYmlKey>(extractTypeName("SomeKey$$SuperType$$")).toStrictEqual(
      {
        clientKey: "SomeKey",
        type: "SuperType",
      }
    );
  });
});
