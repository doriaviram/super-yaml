import { SymlObject } from "../types/syntax";
import { ObjectOf } from "../types/common.types";
export declare class FileSystemService {
    static readYaml(path: string): Promise<ObjectOf<any>>;
    static readSyml(path: string): Promise<SymlObject>;
    static writeYaml(path: string, content: object): Promise<void>;
}
