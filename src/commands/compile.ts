import { Command, flags } from "@oclif/command";
import { FileSystemService } from "../services/file-system.service";
import { SamlTypeFormatter } from "../models/saml-type";

export default class Compile extends Command {
  static description = "describe the command here";

  static examples = [
    `$ super-yaml hello
hello world from ./src/hello.ts!
`,
  ];

  static flags = {
    source: flags.string({ char: "s" }),
  };

  static args = [{ name: "file" }];

  async run() {
    const yml = await FileSystemService.readYaml("./playground/test.syml");

    const { _types } = yml;
    const type0 = new SamlTypeFormatter(Object.values(_types)[0]);

    const recursiveBuild = (yml: any) => {
      const result: { [key: string]: any } = {};
      Object.keys(yml)
        .filter((key) => !key.startsWith("_"))
        .forEach((userYmlKey) => {
          if (userYmlKey.includes("<") && userYmlKey.includes(">")) {
            const startIndex = userYmlKey.indexOf("<");
            result[userYmlKey.substring(0, startIndex)] = type0.build(
              yml[userYmlKey]
            );
          } else {
            if (typeof yml[userYmlKey] === "string") {
              result[userYmlKey] = yml[userYmlKey];
            }
            if (Array.isArray(yml[userYmlKey])) {
              result[userYmlKey] = yml[userYmlKey].map((v) =>
                recursiveBuild(v)
              );
            }
          }
        });
      return result;
    };

    const result = recursiveBuild(yml);
    await FileSystemService.writeYaml("./playground/result.yml", result);
  }
}
