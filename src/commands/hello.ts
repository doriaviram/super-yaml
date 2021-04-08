import { Command, flags } from "@oclif/command";

export default class Hello extends Command {
  static description = "describe the command here";

  static examples = [
    `$ super-yaml hello
hello world from ./src/hello.ts!
`,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    name: flags.string({ char: "n", description: "name to print" }),
  };

  static args = [{ name: "file" }];

  async run() {
    const { flags } = this.parse(Hello);
    const name = flags.name;
    // eslint-disable-next-line no-console
    console.log(`hello ${name} from ./src/commands/hello.ts`);
  }
}
