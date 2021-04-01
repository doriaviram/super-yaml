import { ConsoleMock } from "./mockers/console.mock";

beforeEach(() => {
  ConsoleMock.getInstance().applyMock();
});
