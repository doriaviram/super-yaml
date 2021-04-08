import { ConfigService } from "../../src/services/config.service";

describe("ConfigService", () => {
  it("getConfig => simple flow", async () => {
    expect(ConfigService.getConfig()).toStrictEqual({
      customerYmlKeyPrefix: "<",
      customerYmlKeySuffix: ">",
    });
  });
});
