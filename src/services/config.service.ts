export interface Config {
  customerYmlKeyPrefix: string;
  customerYmlKeySuffix: string;
  variablePrefix: string;
}

export interface ClientConfig {
  customerYmlKeyPrefix?: string;
  customerYmlKeySuffix?: string;
  variablePrefix?: string;
}

const DEFAULT_CONFIG: Config = {
  customerYmlKeyPrefix: "<",
  variablePrefix: "@",
  customerYmlKeySuffix: ">",
};

export class ConfigService {
  private static globalConfig: Config = DEFAULT_CONFIG;

  public static initConfig(clientConfig: ClientConfig = {}): void {
    ConfigService.globalConfig = { ...DEFAULT_CONFIG, ...clientConfig };
  }

  public static getConfig(): Config {
    return ConfigService.globalConfig;
  }
}
