"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YmlBuilder = void 0;
class YmlBuilder {
    constructor() {
        this.data = {};
    }
    complexYml() {
        this.data = {
            test: {
                test: 2,
            },
            testArr: [
                "one",
                {
                    test: 2,
                },
            ],
        };
        return this;
    }
    build() {
        return this.data;
    }
}
exports.YmlBuilder = YmlBuilder;
