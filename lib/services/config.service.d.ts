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
export declare class ConfigService {
    private static globalConfig;
    static initConfig(clientConfig?: ClientConfig): void;
    static getConfig(): Config;
}
