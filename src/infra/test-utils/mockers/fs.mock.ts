import { PathLike, promises } from "fs";
import { resolve } from "path";
type BufferEncoding =
  | "ascii"
  | "utf8"
  | "utf16le"
  | "ucs2"
  | "base64"
  | "latin1"
  | "binary"
  | "hex";

export class FsMock {
  private static instance: FsMock;
  private storage: { [path: string]: string } = {};

  constructor() {
    this.storage = {};
  }

  public static getInstance(): FsMock {
    if (!FsMock.instance) {
      FsMock.instance = new FsMock();
    }
    return FsMock.instance;
  }

  // eslint-disable-next-line no-unused-vars
  private static async readFileMock(
    path: PathLike,
    // eslint-disable-next-line no-unused-vars
    options:
      | { encoding: BufferEncoding; flag?: string | number }
      | BufferEncoding
  ): Promise<string> {
    const resolvedPath = resolve(path.toString());
    const instance = FsMock.getInstance();
    if (instance.storage[resolvedPath]) return instance.storage[resolvedPath];
    throw new Error("..");
  }

  // eslint-disable-next-line no-unused-vars
  private static async writeFileMock(
    path: PathLike,
    data: any,
    // eslint-disable-next-line no-unused-vars
    options?:
      | {
          encoding?: string | null;
          mode?: string | number;
          flag?: string | number;
        }
      | string
      | null
  ): Promise<void> {
    const resolvedPath = resolve(path.toString());
    FsMock.getInstance().storage[resolvedPath] = data;
  }

  public applyMock() {
    this.storage = {};
    // @ts-ignore
    jest.spyOn(promises, "readFile").mockImplementation(FsMock.readFileMock);
    // @ts-ignore
    jest.spyOn(promises, "writeFile").mockImplementation(FsMock.writeFileMock);
  }
}
