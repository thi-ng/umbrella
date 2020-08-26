import {
    defn,
    FLOAT05,
    mod,
    mul,
    PrimTypeMap,
    ret,
    sub,
} from "@thi.ng/shader-ast";

const $ = <N extends 2 | 3, T extends PrimTypeMap[N]>(n: N, type: T) =>
    defn(type, `sdTxRepeat${n}`, [type, type], (p, c) => [
        ret(sub(mod(p, c), mul(c, FLOAT05))),
    ]);

/**
 * 2D domain repetition by wrapping position `p` into period `c`.
 *
 * @param p - vec2
 * @param c - vec2
 */
export const sdfRepeat2 = $(2, "vec2");

/**
 * 3D domain repetition by wrapping position `p` into period `c`.
 *
 * @param p - vec3
 * @param c - vec3
 */
export const sdfRepeat3 = $(3, "vec3");
