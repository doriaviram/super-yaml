import { FileSystemService } from "../../src/services/file-system.service";
import { promises } from "fs";
import { YmlBuilder } from "../../src/infra/test-utils/builders/yml.builder";

describe("FileSystemService", () => {
  it("writeYaml => simple flow", async () => {
    const yml = {
      test: 2,
    };

    await FileSystemService.writeYaml("test.yml", yml);

    const result = await promises.readFile("test.yml");
    expect(result).toEqual(`test: 2\n`);
  });

  it("writeYaml => complex yml", async () => {
    const yml = new YmlBuilder().complexYml().build();

    await FileSystemService.writeYaml("test.yml", yml);

    const result = await promises.readFile("test.yml");
    expect(result).toEqual(
      `test:
  test: 2
testArr:
  - one
  - test: 2
`
    );
  });

  it("readYaml => simple flow", async () => {
    const yml = new YmlBuilder().complexYml().build();
    await FileSystemService.writeYaml("test.yml", yml);

    const ymlFromDisk = await FileSystemService.readYaml("test.yml");

    expect(ymlFromDisk).toStrictEqual(yml);
  });

  it("readYaml => file not exist", async () => {
    await expect(FileSystemService.readYaml("not-exist.yml")).rejects.toThrow();
  });

  it("readYaml => file is not yml", async () => {
    const notYmlContent = "ABCDEFG";

    await promises.writeFile("test.yml", notYmlContent, "utf8");

    await expect(FileSystemService.readYaml("test.yml")).rejects.toThrowError(
      "File 'test.yml' is not valid YAML"
    );
  });
});
