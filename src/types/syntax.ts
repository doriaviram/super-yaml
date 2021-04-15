import { ObjectOf } from "./common.types";

export interface SymlParam {
  key: string;
  defaultValue?: string;
}

export interface SymlSyntax {
  _types?: ObjectOf<SymlType>;
  _import?: string[];
  [key: string]: any;
}

export interface SymlType {
  properties: ObjectOf<any>;
}

export interface SymlObject {
  types: ObjectOf<SymlType>;
  import: string[];
  clientData: ObjectOf<any>;
}

export interface ClientYmlKey {
  clientKey: string;
  type?: string;
}
