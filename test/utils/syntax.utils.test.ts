import { extractTypeName } from "../../src/utils/syntax.utils";
import { ClientYmlKey } from "../../src/types/syntax";
import { ConfigService } from "../../src/services/config.service";

describe("syntax.utils", () => {
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
