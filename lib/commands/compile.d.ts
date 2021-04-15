import { Command, flags } from "@oclif/command";
export default class Compile extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        source: flags.IOptionFlag<string>;
        target: flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
