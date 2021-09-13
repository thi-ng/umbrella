import type { PrimTypeMap, Sym } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { dot, length } from "@thi.ng/shader-ast/builtin/math";
import { clamp01 } from "../math/clamp";

/**
 * Shared impl for sdLine2/3
 *
 * @param p -
 * @param a -
 * @param b -
 */
const $ = <N extends 2 | 3, T extends PrimTypeMap[N]>(n: N, type: T) =>
    defn("float", `sdLine${n}`, [type, type, type], (p, a, b) => {
        let pa: Sym<T>, ba: Sym<T>;
        return [
            (pa = sym(sub(p, a))),
            (ba = sym(sub(b, a))),
            ret(
                length(sub(pa, mul(ba, clamp01(div(dot(pa, ba), dot(ba, ba))))))
            ),
        ];
    });

/**
 * Returns signed distance from `p` to 2D line segment `a` -> `b`.
 *
 * @param p - vec2
 * @param a - vec2
 * @param b - vec2
 */
export const sdfLine2 = $(2, "vec2");

/**
 * Returns signed distance from `p` to 3D line segment `a` -> `b`.
 *
 * @param p - vec3
 * @param a - vec3
 * @param b - vec3
 */
export const sdfLine3 = $(3, "vec3");
