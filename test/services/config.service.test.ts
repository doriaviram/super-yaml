import { Config, ConfigService } from "../../src/services/config.service";

const expectedConfig: Config = {
  typeKeyPrefix: "<",
  typeKeySuffix: ">",
  variablePrefix: "_",
  typeVariablePrefix: "<%",
  typeVariableSuffix: "%>",
};

describe("ConfigService", () => {
  it("getConfig => simple flow", async () => {
    expect<Config>(ConfigService.getConfig()).toStrictEqual<Config>(
      expectedConfig
    );
  });

  it("getConfig => init => empty", async () => {
    ConfigService.initConfig();
    expect<Config>(ConfigService.getConfig()).toStrictEqual<Config>(
      expectedConfig
    );
  });

  it("getConfig => init & reset config", async () => {
    ConfigService.initConfig({ typeKeyPrefix: "!!!!" });
    expect<string>(
      ConfigService.getConfig().typeKeyPrefix
    ).toStrictEqual<string>("!!!!");
    ConfigService.resetConfig();
    expect<Config>(ConfigService.getConfig()).toStrictEqual<Config>(
      expectedConfig
    );
  });
});
