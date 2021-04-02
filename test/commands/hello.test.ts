import Hello from "../../src/commands/hello";
import { ConsoleMock } from "../../src/infra/test-utils/mockers/console.mock";

describe("hello", () => {
  it("hello => simple flow", async () => {
    await Hello.run(["--name", "syml"]);
    expect(ConsoleMock.getInstance().getCalls()).toEqual([
      ["hello syml from ./src/commands/hello.ts"],
    ]);
  });
});
