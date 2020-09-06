import type { IObjectOf } from "@thi.ng/api";
import type { Term } from "../api/nodes";
import type { FloatTerm } from "../api/terms";
import type { Int, IVec, Prim, Type, UVec } from "../api/types";
import { bool, float, int, uint, vec2, vec3, vec4 } from "./lit";

/**
 * Returns base type for given term. Used for array ops.
 *
 * @example
 * ```ts
 * itemType("vec2[]") => "vec2"
 * ```
 */
export const itemType = (type: Type) => <Type>type.replace("[]", "");

/**
 * Takes a numeric term and a plain number, returns number wrapped in
 * typed literal compatible with term.
 *
 * @param t -
 * @param x -
 */
export const numberWithMatchingType = (t: Term<Prim | Int>, x: number) => {
    const id = t.type[0];
    return id === "i"
        ? int(x)
        : id === "u"
        ? uint(x)
        : id === "b"
        ? bool(x)
        : float(x);
};

export const matchingPrimFor = <T extends Prim>(
    t: Term<T>,
    x: FloatTerm
): Term<T> => {
    const ctor = (<any>{ vec2, vec3, vec4 })[t.type];
    return ctor ? ctor(x) : x;
};

export const matchingBoolType = <T extends Prim | Int | IVec | UVec>(
    t: Term<T>
) =>
    (<IObjectOf<Type>>{
        float: "bool",
        int: "bool",
        uint: "bool",
        vec2: "bvec2",
        ivec2: "bvec2",
        uvec2: "bvec2",
        vec3: "bvec3",
        ivec3: "bvec3",
        uvec3: "bvec3",
        vec4: "bvec4",
        ivec4: "bvec4",
        uvec4: "bvec4",
    })[t.type];
