import { ConsoleMock } from "./mockers/console.mock";
import { FsMock } from "./mockers/fs.mock";

beforeEach(() => {
  ConsoleMock.getInstance().applyMock();
  FsMock.getInstance().applyMock();
});
