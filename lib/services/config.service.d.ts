export interface Config {
    typeKeyPrefix: string;
    typeKeySuffix: string;
    variablePrefix: string;
    typeVariablePrefix: string;
}
export interface ClientConfig {
    typeKeyPrefix?: string;
    typeKeySuffix?: string;
    variablePrefix?: string;
    typeVariablePrefix?: string;
}
export declare class ConfigService {
    private static globalConfig;
    static resetConfig(): void;
    static initConfig(clientConfig?: ClientConfig): void;
    static getConfig(): Config;
}
