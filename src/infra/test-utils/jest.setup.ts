import { ConsoleMock } from "./mockers/console.mock";
import { FsMock } from "./mockers/fs.mock";
import { ConfigService } from "../../services/config.service";

beforeEach(() => {
  ConsoleMock.getInstance().applyMock();
  FsMock.getInstance().applyMock();
  ConfigService.initConfig();
});
