import { isNative, isString, noop } from "../../src/utils/general.utils";

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
    expect(isString([])).toBeTruthy();
  });
});
