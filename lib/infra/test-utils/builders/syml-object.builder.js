"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymlObjectBuilder = void 0;
const faker = require("faker");
class SymlObjectBuilder {
    constructor() {
        this.data = {
            types: {},
            import: [],
            clientData: {},
        };
    }
    addRandomType() {
        const randomString = () => faker.name.firstName();
        this.data.types[faker.vehicle.type()] = {
            properties: {
                [randomString()]: `$${randomString()}`,
                [randomString()]: randomString(),
                [randomString()]: `$${randomString()}:$${randomString()}`,
            },
        };
        return this;
    }
    types(types) {
        this.data.types = types;
        return this;
    }
    addImport(importToAdd) {
        this.data.import.push(importToAdd);
        return this;
    }
    clientData(clientData) {
        this.data.clientData = clientData;
        return this;
    }
    build() {
        return this.data;
    }
    buildAsClientSyntax() {
        return Object.assign({ _types: this.data.types, _import: this.data.import }, this.data.clientData);
    }
}
exports.SymlObjectBuilder = SymlObjectBuilder;
