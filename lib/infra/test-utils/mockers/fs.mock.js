"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsMock = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class FsMock {
    constructor() {
        this.storage = {};
        this.storage = {};
    }
    static getInstance() {
        if (!FsMock.instance) {
            FsMock.instance = new FsMock();
        }
        return FsMock.instance;
    }
    // eslint-disable-next-line no-unused-vars
    static async readFileMock(path, 
    // eslint-disable-next-line no-unused-vars
    options) {
        const resolvedPath = path_1.resolve(path.toString());
        const instance = FsMock.getInstance();
        if (instance.storage[resolvedPath])
            return instance.storage[resolvedPath];
        throw new Error("..");
    }
    // eslint-disable-next-line no-unused-vars
    static async writeFileMock(path, data, 
    // eslint-disable-next-line no-unused-vars
    options) {
        const resolvedPath = path_1.resolve(path.toString());
        FsMock.getInstance().storage[resolvedPath] = data;
    }
    applyMock() {
        this.storage = {};
        // @ts-ignore
        jest.spyOn(fs_1.promises, "readFile").mockImplementation(FsMock.readFileMock);
        // @ts-ignore
        jest.spyOn(fs_1.promises, "writeFile").mockImplementation(FsMock.writeFileMock);
    }
}
exports.FsMock = FsMock;
