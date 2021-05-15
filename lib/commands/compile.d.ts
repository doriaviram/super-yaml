import { Command, flags } from "@oclif/command";
export default class Compile extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        source: flags.IOptionFlag<string>;
        target: flags.IOptionFlag<string>;
        typeKeyPrefix: flags.IOptionFlag<string | undefined>;
        typeKeySuffix: flags.IOptionFlag<string | undefined>;
        typeVariablePrefix: flags.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
