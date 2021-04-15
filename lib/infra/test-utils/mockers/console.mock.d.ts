export declare class ConsoleMock {
    private static instance;
    private spy;
    static getInstance(): ConsoleMock;
    applyMock(): void;
    getCalls(): any[] | undefined;
}
