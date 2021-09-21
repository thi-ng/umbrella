import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2 } from "@thi.ng/shader-ast/ast/lit";
import { div, mul, neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { dot, min, sign, sqrt } from "@thi.ng/shader-ast/builtin/math";
import { clamp01 } from "../math/clamp";
import { cross2 } from "../math/cross2";

/**
 * @param p - vec2
 * @param a - vec2
 * @param b - vec2
 * @param c - vec2
 */
export const sdfTriangle2 = defn(
    "float",
    "sdTriangle",
    ["vec2", "vec2", "vec2", "vec2"],
    (p, a, b, c) => {
        let e0: Vec2Sym, e1: Vec2Sym, e2: Vec2Sym;
        let v0: Vec2Sym, v1: Vec2Sym, v2: Vec2Sym;
        let pq0: Vec2Sym, pq1: Vec2Sym, pq2: Vec2Sym;
        let s: FloatSym;
        let d: Vec2Sym;

        const $pq = (v: Vec2Sym, e: Vec2Sym) =>
            sub(v, mul(e, clamp01(div(dot(v, e), dot(e, e)))));

        return [
            (e0 = sym(sub(b, a))),
            (e1 = sym(sub(c, b))),
            (e2 = sym(sub(a, c))),
            (v0 = sym(sub(p, a))),
            (v1 = sym(sub(p, b))),
            (v2 = sym(sub(p, c))),
            (pq0 = sym($pq(v0, e0))),
            (pq1 = sym($pq(v1, e1))),
            (pq2 = sym($pq(v2, e2))),
            (s = sym(sign(cross2(e0, e2)))),
            (d = sym(
                min(
                    min(
                        vec2(dot(pq0, pq0), mul(s, cross2(v0, e0))),
                        vec2(dot(pq1, pq1), mul(s, cross2(v1, e1)))
                    ),
                    vec2(dot(pq2, pq2), mul(s, cross2(v2, e2)))
                )
            )),
            ret(mul(neg(sqrt($x(d))), sign($y(d)))),
        ];
    }
);
