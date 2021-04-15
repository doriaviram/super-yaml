import { ObjectOf } from "../types/common.types";
import { SymlObject, SymlType } from "../types/syntax";
export declare class ImportService {
    static importAllTypes(root: SymlObject, currentPath?: string): Promise<ObjectOf<SymlType>>;
}
