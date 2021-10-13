import type { FloatSym, Vec2Sym, Vec3Sym } from "@thi.ng/shader-ast";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { forLoop } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import {
    float,
    FLOAT0,
    int,
    SQRT2,
    vec2,
    vec3,
} from "@thi.ng/shader-ast/ast/lit";
import { add, div, inc, lte, madd, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $xy, $z } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import {
    dot,
    floor,
    fract,
    pow,
    smoothstep,
    sqrt,
} from "@thi.ng/shader-ast/builtin/math";
import { hash32 } from "./hash.js";

/**
 * IQ's parametric 2D voronoise. Depending on `u` and `v`, this function
 * produces 4 different noise types
 *
 * - cell noise (0,0)
 * - voronoi (1,0)
 * - perlin noise (0,1)
 * - voronoise (1,1)
 *
 * {@link http://www.iquilezles.org/www/articles/voronoise/voronoise.htm}
 *
 * Note: This implementation uses the improved {@link hash32} by Dave Hoskins
 * instead of iq's original {@link hash3}.
 *
 * @param p -
 * @param u -
 * @param v -
 */
export const voronoise2 = defn(
    "float",
    "voronoise2",
    ["vec2", "float", "float"],
    (x, u, v) => {
        let p: Vec2Sym;
        let f: Vec2Sym;
        let coeff: Vec3Sym;
        let k: FloatSym;
        let va: FloatSym;
        let wt: FloatSym;
        let g: Vec2Sym;
        let o: Vec3Sym;
        let r: Vec2Sym;
        let w: FloatSym;
        return [
            (p = sym(floor(x))),
            (f = sym(fract(x))),
            (coeff = sym(vec3(u, u, 1))),
            (k = sym(add(1, mul(63, pow(sub(1, v), float(4)))))),
            (va = sym(FLOAT0)),
            (wt = sym(FLOAT0)),
            forLoop(
                sym(int(-2)),
                (i) => lte(i, int(2)),
                inc,
                (i) => [
                    forLoop(
                        sym(int(-2)),
                        (j) => lte(j, int(2)),
                        inc,
                        (j) => [
                            (g = sym(vec2(float(i), float(j)))),
                            (o = sym(mul(hash32(add(p, g)), coeff))),
                            (r = sym(add(sub(g, f), $xy(o)))),
                            (w = sym(
                                pow(
                                    sub(
                                        1,
                                        smoothstep(
                                            FLOAT0,
                                            SQRT2,
                                            sqrt(dot(r, r))
                                        )
                                    ),
                                    k
                                )
                            )),
                            assign(va, madd(w, $z(o), va)),
                            assign(wt, add(wt, w)),
                        ]
                    ),
                ]
            ),
            ret(div(va, wt)),
        ];
    }
);
