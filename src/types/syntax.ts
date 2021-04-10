import { ObjectOf } from "./common.types";

export interface SymlParam {
  key: string;
  defaultValue?: string;
}

export interface SymlType {
  template: ObjectOf<any>;
}

export interface SymlObject {
  _types?: ObjectOf<SymlType>;
  _import?: string[];
  [key: string]: any;
}

export interface ClientYmlKey {
  clientKey: string;
  type?: string;
}
