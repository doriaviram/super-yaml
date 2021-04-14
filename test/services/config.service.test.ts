import { Config, ConfigService } from "../../src/services/config.service";

describe("ConfigService", () => {
  it("getConfig => simple flow", async () => {
    expect<Config>(ConfigService.getConfig()).toStrictEqual<Config>({
      customerYmlKeyPrefix: "<",
      customerYmlKeySuffix: ">",
      variablePrefix: "@",
    });
  });
});
