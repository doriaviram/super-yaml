export interface Config {
  typeKeyPrefix: string;
  typeKeySuffix: string;
  variablePrefix: string;
  typeVariablePrefix: string;
  typeVariableSuffix: string;
}

export interface ClientConfig {
  typeKeyPrefix?: string;
  typeKeySuffix?: string;
  variablePrefix?: string;
  typeVariablePrefix?: string;
  typeVariableSuffix?: string;
}

const DEFAULT_CONFIG: Config = {
  typeKeyPrefix: "<",
  variablePrefix: "_",
  typeVariablePrefix: "<%",
  typeVariableSuffix: "%>",
  typeKeySuffix: ">",
};

export class ConfigService {
  private static globalConfig: Config = DEFAULT_CONFIG;

  public static resetConfig(): void {
    ConfigService.globalConfig = DEFAULT_CONFIG;
  }

  public static initConfig(clientConfig: ClientConfig = {}): void {
    ConfigService.globalConfig = {
      ...ConfigService.globalConfig,
      ...clientConfig,
    };
  }

  public static getConfig(): Config {
    return ConfigService.globalConfig;
  }
}
