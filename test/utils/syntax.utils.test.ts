import { parseParam } from "../../src/utils/syntax.utils";

describe("syntax.utils", () => {
  it("parseParam => param", () => {
    expect(parseParam("$name")).toStrictEqual({
      key: "name",
      defaultValue: undefined,
    });
  });

  it("parseParam => no-param", () => {
    expect(parseParam("no-param")).toBeUndefined();
  });

  it("parseParam => param with default value", () => {
    expect(parseParam("$name:2")).toStrictEqual({
      key: "name",
      defaultValue: "2",
    });
  });
});
