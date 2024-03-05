import type { BVec3Sym, FloatSym, IntSym, Vec2Sym } from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { forLoop, ifThen } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { index } from "@thi.ng/shader-ast/ast/indexed";
import { FLOAT1, INT0, bvec3, int } from "@thi.ng/shader-ast/ast/lit";
import {
	div,
	gt,
	gte,
	inc,
	lt,
	mul,
	neg,
	not,
	or,
	sub,
} from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { _any, all } from "@thi.ng/shader-ast/builtin/bvec";
import { dot, minSelf, sqrt } from "@thi.ng/shader-ast/builtin/math";
import { clamp01 } from "../math/clamp.js";

/**
 * Higher-order function. Returns specialized function to compute signed
 * distance for 2D polygons of `N` vertices.
 *
 * @remarks
 * Based on original GLSL impl by Inigo Quilez:
 * - https://iquilezles.org/articles/distfunctions2d/
 *
 * @param N
 */
export const sdfPolygon2 = (N: number) =>
	defn(
		F,
		`sdfPolygon2_${N}`,
		[V2, ["vec2[]", "pts", { num: N }]],
		(p, pts) => {
			let d: FloatSym, s: FloatSym;
			let b: Vec2Sym, e: Vec2Sym, w: Vec2Sym, t: Vec2Sym;
			let pi: Vec2Sym, pj: Vec2Sym;
			let c: BVec3Sym;
			let j: IntSym;
			return [
				(t = sym(sub(p, index(pts, 0)))),
				(d = sym(dot(t, t))),
				(s = sym(FLOAT1)),
				(j = sym(int(N - 1))),
				forLoop(
					sym(INT0),
					(i) => lt(i, int(N)),
					inc,
					(i) => [
						(pi = sym(index(pts, i))),
						(pj = sym(index(pts, j))),
						(e = sym(sub(pj, pi))),
						(w = sym(sub(p, pi))),
						(b = sym(
							sub(w, mul(e, clamp01(div(dot(w, e), dot(e, e)))))
						)),
						minSelf(d, dot(b, b)),
						(c = sym(
							bvec3(
								gte($y(p), $y(pi)),
								lt($y(p), $y(pj)),
								gt(mul($x(e), $y(w)), mul($y(e), $x(w)))
							)
						)),
						ifThen(or(all(c), not(_any(c))), [assign(s, neg(s))]),
						assign(j, i),
					]
				),
				ret(mul(s, sqrt(d))),
			];
		}
	);
