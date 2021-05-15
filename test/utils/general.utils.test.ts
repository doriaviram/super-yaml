import {
  allIndexesOf,
  indexOfOrLength,
  isNative,
  isString,
  mapKeysDeep,
  noop,
} from "../../src/utils/general.utils";

describe("general.utils", () => {
  it("noop", () => {
    expect(noop()).toBeUndefined();
  });

  it("isNative", () => {
    expect(isNative("2")).toBeTruthy();
    expect(isNative(2)).toBeTruthy();
    expect(isNative(2.2)).toBeTruthy();
    expect(isNative(true)).toBeTruthy();
    expect(isNative(false)).toBeTruthy();
    expect(isNative({})).toBeFalsy();
    expect(isNative(undefined)).toBeFalsy();
    expect(isNative([])).toBeFalsy();
  });

  it("isString", () => {
    expect(isString("2")).toBeTruthy();
    expect(isString(2)).toBeFalsy();
    expect(isString(2.2)).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(false)).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString([])).toBeFalsy();
  });

  it("mapKeysDeep", () => {
    const obj = { a: "b", c: "d", e: { c: "f", g: { c: "h" } } };

    const result = mapKeysDeep(obj, (value: any, key: any) => {
      if (key === "c") {
        return "zzz";
      }
      return key;
    });

    expect(result).toEqual({
      a: "b",
      zzz: "d",
      e: { zzz: "f", g: { zzz: "h" } },
    });
  });

  it("mapKeysDeep => object inside list", () => {
    const obj = { a: "b", c: "d", e: { c: "f", g: [{ c: "h" }, { c: "h1" }] } };

    const result = mapKeysDeep(obj, (value: any, key: any) => {
      if (key === "c") {
        return "zzz";
      }
      return key;
    });

    expect(result).toEqual({
      a: "b",
      zzz: "d",
      e: { zzz: "f", g: [{ zzz: "h" }, { zzz: "h1" }] },
    });
  });

  it("mapKeysDeep => list of strings", () => {
    const obj = { a: "b", c: "d", e: { c: "f", g: ["h123", "h123"] } };

    const result = mapKeysDeep(obj, (value: any, key: any) => {
      if (key === "c") {
        return "zzz";
      }
      return key;
    });

    expect(result).toEqual({
      a: "b",
      zzz: "d",
      e: { zzz: "f", g: ["h123", "h123"] },
    });
  });

  it("mapKeysDeep => list of lists", () => {
    const obj = {
      a: "b",
      c: "d",
      e: { c: "f", g: [["h123", "h123"], "h123"] },
    };

    const result = mapKeysDeep(obj, (value: any, key: any) => {
      if (key === "c") {
        return "zzz";
      }
      return key;
    });

    expect(result).toEqual({
      a: "b",
      zzz: "d",
      e: { zzz: "f", g: [["h123", "h123"], "h123"] },
    });
  });

  it("allIndexesOf => simple flow", () => {
    const s = "babbbabbbc";

    const result = allIndexesOf(s, "a");

    expect<number[]>(result).toEqual([1, 5]);
  });

  it("allIndexesOf => not found", () => {
    const s = "babbbabbbc";

    const result = allIndexesOf(s, "not-found");

    expect<number[]>(result).toEqual([]);
  });

  it("indexOfOrLength => simple flow", () => {
    const s = "ba$bbabbbc";

    const result = indexOfOrLength(s, "$");

    expect<number>(result).toEqual(2);
  });

  it("indexOfOrLength => not found", () => {
    const s = "bacbbabbbc";

    const result = indexOfOrLength(s, "$");

    expect<number>(result).toEqual(s.length);
  });
});
