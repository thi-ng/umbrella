import { isNumber } from "@thi.ng/checks";
import type { Index, IndexM, Sym } from "../api/nodes";
import type { UintTerm } from "../api/terms";
import type {
    Indexable,
    IndexTypeMap,
    Mat,
    MatIndexTypeMap,
    NumericI,
    Vec,
} from "../api/types";
import { int } from "./lit";

export const index = <T extends Indexable>(
    val: Sym<T>,
    id: NumericI | UintTerm
): Index<IndexTypeMap[T]> => ({
    tag: "idx",
    type: <any>val.type.substr(0, val.type.length - 2),
    id: isNumber(id) ? int(id) : id,
    val,
});

const MAT_VEC: Record<Mat, Vec> = {
    mat2: "vec2",
    mat3: "vec3",
    mat4: "vec4",
    // mat23: "vec3",
    // mat24: "vec4",
    // mat32: "vec2",
    // mat34: "vec4",
    // mat42: "vec2",
    // mat43: "vec3",
};

// prettier-ignore
export function indexMat<T extends keyof MatIndexTypeMap>(m: Sym<T>, id: number): IndexM<MatIndexTypeMap[T]>;
// prettier-ignore
export function indexMat<T extends keyof MatIndexTypeMap>(m: Sym<T>, a: number, b: number): Index<"float">;
export function indexMat(m: Sym<any>, a: number, b?: number): any {
    const idx: IndexM<any> = {
        tag: "idxm",
        type: MAT_VEC[<Mat>m.type],
        id: int(a),
        val: m,
    };
    return b !== undefined
        ? { tag: "idx", type: "float", id: int(b), val: idx }
        : idx;
}
