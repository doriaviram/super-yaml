export interface Config {
  customerYmlKeyPrefix: string;
  customerYmlKeySuffix: string;
}

export interface ClientConfig {
  customerYmlKeyPrefix?: string;
  customerYmlKeySuffix?: string;
}

const DEFAULT_CONFIG: Config = {
  customerYmlKeyPrefix: "<",
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
