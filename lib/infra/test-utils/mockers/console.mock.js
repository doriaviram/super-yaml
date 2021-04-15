"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleMock = void 0;
class ConsoleMock {
    static getInstance() {
        if (!ConsoleMock.instance) {
            ConsoleMock.instance = new ConsoleMock();
        }
        return ConsoleMock.instance;
    }
    applyMock() {
        this.spy = jest.spyOn(console, "log");
        this.spy.mockImplementation(() => { });
        this.spy.mockClear();
    }
    getCalls() {
        var _a;
        return (_a = this.spy) === null || _a === void 0 ? void 0 : _a.mock.calls;
    }
}
exports.ConsoleMock = ConsoleMock;
