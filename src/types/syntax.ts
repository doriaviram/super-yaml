export interface SymlParam {
  key: string;
  defaultValue?: string;
}

export interface SymlType {
  template: { [key: string]: any };
}

export interface SymlObject {
  _types: { [key: string]: SymlType };
  [key: string]: any;
}

export interface ClientYmlKey {
  clientKey: string;
  type?: string;
}
