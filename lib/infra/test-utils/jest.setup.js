"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_mock_1 = require("./mockers/console.mock");
const fs_mock_1 = require("./mockers/fs.mock");
const config_service_1 = require("../../services/config.service");
beforeEach(() => {
    console_mock_1.ConsoleMock.getInstance().applyMock();
    fs_mock_1.FsMock.getInstance().applyMock();
    config_service_1.ConfigService.resetConfig();
});
