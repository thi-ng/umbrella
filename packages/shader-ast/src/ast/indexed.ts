import { isNumber } from "@thi.ng/checks";
import { int } from "./lit";
import type { Index, Sym } from "../api/nodes";
import type { UintTerm } from "../api/terms";
import type {
    Indexable,
    IndexTypeMap,
    MatIndexTypeMap,
    NumericI,
} from "../api/types";

export const index = <T extends Indexable>(
    val: Sym<T>,
    id: NumericI | UintTerm
): Index<IndexTypeMap[T]> => ({
    tag: "idx",
    type: <any>val.type.substr(0, val.type.length - 2),
    id: isNumber(id) ? int(id) : id,
    val,
});

// prettier-ignore
export function indexMat<T extends keyof MatIndexTypeMap>(m: Sym<T>, id: number): Index<MatIndexTypeMap[T]>;
// prettier-ignore
export function indexMat<T extends keyof MatIndexTypeMap>(m: Sym<T>, a: number, b: number): Index<"float">;
export function indexMat(m: Sym<any>, a: number, b?: number): Index<any> {
    const idx: any = {
        tag: "idx",
        type: <any>m.type.replace("mat", "vec"),
        id: int(a),
        val: m,
    };
    return b !== undefined
        ? { tag: "idx", type: "float", id: int(b), val: idx }
        : idx;
}
