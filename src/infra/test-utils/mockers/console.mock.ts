export class ConsoleMock {
  private static instance: ConsoleMock;

  private spy: jest.SpyInstance | undefined;

  public static getInstance(): ConsoleMock {
    if (!ConsoleMock.instance) {
      ConsoleMock.instance = new ConsoleMock();
    }
    return ConsoleMock.instance;
  }

  public applyMock() {
    this.spy = jest.spyOn(console, "log");
    this.spy.mockImplementation(() => {});
    this.spy.mockClear();
  }

  public getCalls() {
    return this.spy?.mock.calls;
  }
}
