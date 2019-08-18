import { Term } from "../api/nodes";
import { FloatTerm } from "../api/terms";
import { Int, Prim, Type } from "../api/types";
import {
    bool,
    float,
    int,
    uint,
    vec2,
    vec3,
    vec4
} from "./lit";

/**
 * Returns base type for given term. Used for array ops.
 *
 * ```
 * itemType("vec2[]") => "vec2"
 * ```
 */
export const itemType = (type: Type) => <Type>type.replace("[]", "");

/**
 * Takes a numeric term and a plain number, returns number wrapped in
 * typed literal compatible with term.
 *
 * @param t
 * @param x
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
