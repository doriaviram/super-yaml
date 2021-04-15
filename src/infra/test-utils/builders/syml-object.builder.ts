import { SymlObject, SymlSyntax, SymlType } from "../../../types/syntax";
import { ObjectOf } from "../../../types/common.types";
import * as faker from "faker";

export class SymlObjectBuilder {
  private data: SymlObject = {
    types: {},
    import: [],
    clientData: {},
  };

  public addRandomType(): SymlObjectBuilder {
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

  public types(types: ObjectOf<SymlType>): SymlObjectBuilder {
    this.data.types = types;
    return this;
  }

  public addImport(importToAdd: string): SymlObjectBuilder {
    this.data.import.push(importToAdd);
    return this;
  }

  public clientData(clientData: ObjectOf<any>): SymlObjectBuilder {
    this.data.clientData = clientData;
    return this;
  }

  public build(): SymlObject {
    return this.data;
  }

  public buildAsClientSyntax(): SymlSyntax {
    return {
      _types: this.data.types,
      _import: this.data.import,
      ...this.data.clientData,
    };
  }
}
