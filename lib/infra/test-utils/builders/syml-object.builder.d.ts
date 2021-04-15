import { SymlObject, SymlSyntax, SymlType } from "../../../types/syntax";
import { ObjectOf } from "../../../types/common.types";
export declare class SymlObjectBuilder {
    private data;
    addRandomType(): SymlObjectBuilder;
    types(types: ObjectOf<SymlType>): SymlObjectBuilder;
    addImport(importToAdd: string): SymlObjectBuilder;
    clientData(clientData: ObjectOf<any>): SymlObjectBuilder;
    build(): SymlObject;
    buildAsClientSyntax(): SymlSyntax;
}
