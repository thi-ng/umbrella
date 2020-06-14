import {
    defn,
    div,
    dot,
    length,
    mul,
    ret,
    sub,
    Sym,
    sym,
    Vec,
} from "@thi.ng/shader-ast";
import { clamp01 } from "../math/clamp";

/**
 * Shared impl for sdLine2/3
 *
 * @param p -
 * @param a -
 * @param b -
 */
const line = <T extends Vec>(p: Sym<T>, a: Sym<T>, b: Sym<T>) => {
    let pa: Sym<T>, ba: Sym<T>;
    return [
        (pa = sym(sub(p, a))),
        (ba = sym(sub(b, a))),
        ret(length(sub(pa, mul(ba, clamp01(div(dot(pa, ba), dot(ba, ba))))))),
    ];
};

/**
 * Returns signed distance from `p` to centered circle of radius `r`.
 *
 * @param p - vec2
 * @param r - float
 */
export const sdfLine2 = defn(
    "float",
    "sdLine2",
    ["vec2", "vec2", "vec2"],
    line
);

/**
 * @param p - vec3
 * @param a - vec3
 * @param b - vec3
 */
export const sdfLine3 = defn(
    "float",
    "sdLine3",
    ["vec3", "vec3", "vec3"],
    line
);
