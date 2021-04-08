import { Command, flags } from "@oclif/command";
import { FileSystemService } from "../services/file-system.service";
import { CompileService } from "../services/compile.service";

export default class Compile extends Command {
  static description = "Compile syml to simple yml";

  static examples = [
    `$ super-yaml compile -s config.syml -t config.yml`,
    `$ super-yaml compile --source config.syml --target config.yml`,
  ];

  static flags = {
    source: flags.string({ char: "s", required: true }),
    target: flags.string({ char: "t", required: true }),
  };

  async run() {
    const { flags } = this.parse(Compile);
    const { source, target } = flags;

    const syml = await FileSystemService.readYaml(source);
    const result = CompileService.compileSaml(syml);
    await FileSystemService.writeYaml(target, result);
  }
}
