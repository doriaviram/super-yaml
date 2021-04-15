export declare class FsMock {
    private static instance;
    private storage;
    constructor();
    static getInstance(): FsMock;
    private static readFileMock;
    private static writeFileMock;
    applyMock(): void;
}
