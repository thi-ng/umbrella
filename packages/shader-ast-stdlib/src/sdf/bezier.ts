import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { ifThen } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import {
	float,
	FLOAT0,
	FLOAT1,
	FLOAT2,
	vec2,
} from "@thi.ng/shader-ast/ast/lit";
import {
	add,
	div,
	gte,
	lt,
	madd,
	mul,
	neg,
	sub,
} from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import {
	abs,
	acos,
	cos,
	dot,
	powf,
	sign,
	sin,
	sqrt,
} from "@thi.ng/shader-ast/builtin/math";
import { clamp01 } from "../math/clamp.js";
import { cross2 } from "../math/cross2.js";

/**
 * Returns signed distance from `p` to 2D quadratic bezier (given by points A,
 * B, C).
 *
 * @remarks
 * Ported from original GLSL impl by Inigo Quilez:
 *
 * - https://www.shadertoy.com/view/MlKcDD
 * - https://iquilezles.org/articles/distfunctions2d/
 */
export const sdfQuadratic2 = defn(
	"float",
	"sdfQuadratic2",
	["vec2", "vec2", "vec2", "vec2"],
	(pos, A, B, C) => {
		let a: Vec2Sym, b: Vec2Sym, c: Vec2Sym, d: Vec2Sym;
		let kk: FloatSym, kx: FloatSym, ky: FloatSym, kz: FloatSym;
		let p: FloatSym, q: FloatSym, p3: FloatSym, q2: FloatSym, h: FloatSym;
		let m: FloatSym, n: FloatSym, t: FloatSym, v: FloatSym, z: FloatSym;
		let res: FloatSym, sgn: FloatSym;
		let x: Vec2Sym, y: Vec2Sym, uv: Vec2Sym;
		return [
			(a = sym(sub(B, A))),
			(b = sym(add(madd(B, -2, A), C))),
			(c = sym(mul(a, 2))),
			(d = sym(sub(A, pos))),
			(kk = sym(div(FLOAT1, dot(b, b)))),
			(kx = sym(mul(kk, dot(a, b)))),
			(ky = sym(mul(kk, div(madd(FLOAT2, dot(a, a), dot(d, b)), 3)))),
			(kz = sym(mul(kk, dot(d, a)))),
			(res = sym(FLOAT0)),
			(sgn = sym(FLOAT0)),
			(p = sym(sub(ky, mul(kx, kx)))),
			(q = sym(madd(sub(mul(mul(FLOAT2, kx), kx), mul(3, ky)), kx, kz))),
			(p3 = sym(mul(mul(p, p), p))),
			(q2 = sym(mul(q, q))),
			(h = sym(madd(p3, 4, q2))),
			ifThen(
				gte(h, FLOAT0),
				[
					assign(h, sqrt(h)),
					(x = sym(div(sub(vec2(h, neg(h)), q), FLOAT2))),
					(uv = sym(mul(sign(x), powf(abs(x), float(1 / 3))))),
					(t = sym(clamp01(sub(add($x(uv), $y(uv)), kx)))),
					assign(x, madd(madd(b, t, c), t, d)),
					assign(res, dot(x, x)),
					assign(sgn, cross2(madd(b, mul(t, FLOAT2), c), x)),
				],
				[
					(z = sym(sqrt(neg(p)))),
					(v = sym(
						div(acos(div(q, mul(mul(p, z), FLOAT2))), float(3))
					)),
					(m = sym(cos(v))),
					(n = sym(mul(sin(v), 1.732050808))),
					(uv = sym(
						clamp01(
							sub(mul(vec2(add(m, m), sub(neg(n), m)), z), kx)
						)
					)),
					(x = sym(madd(madd(b, $x(uv), c), $x(uv), d))),
					(y = sym(madd(madd(b, $y(uv), c), $y(uv), d))),
					assign(m, dot(x, x)),
					assign(n, dot(y, y)),
					ifThen(
						lt(m, n),
						[
							assign(res, m),
							assign(sgn, cross2(madd(b, mul($x(uv), 2), c), x)),
						],
						[
							assign(res, n),
							assign(sgn, cross2(madd(b, mul($y(uv), 2), c), y)),
						]
					),
				]
			),
			ret(mul(sign(sgn), sqrt(res))),
		];
	}
);
