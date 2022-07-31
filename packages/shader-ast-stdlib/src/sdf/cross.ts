import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast/api/syms";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { ifThen, ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, FLOAT05, vec2, VEC2_0 } from "@thi.ng/shader-ast/ast/lit";
import { add, gt, madd, mul, neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { abs, length, max, min, sign } from "@thi.ng/shader-ast/builtin/math";
import { maxComp2 } from "../math/maxcomp.js";

/**
 * Returns signed distance from `p` to 2D cross/plus of given `size` and corner
 * radius `r`.
 *
 * @remarks
 * - `size` consist of overall width/size (in x) and thickness (in y component)
 * - corner radius can also be negative
 *
 * Ported from original GLSL impl by Inigo Quilez:
 * - https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p -
 * @param size -
 * @param r -
 */
export const sdfCross2 = defn(
	"float",
	"sdfCross2",
	["vec2", "vec2", "float"],
	(p, size, r) => {
		let a: Vec2Sym, q: Vec2Sym, w: Vec2Sym;
		let k: FloatSym;
		return [
			(a = sym(abs(p))),
			ifThen(gt($y(a), $x(a)), [assign(a, $(a, "yx"))]),
			(q = sym(sub(a, size))),
			(k = sym(maxComp2(q))),
			(w = sym(
				ternary(gt(k, FLOAT0), q, vec2(sub($y(size), $x(a)), neg(k)))
			)),
			ret(madd(sign(k), length(max(w, VEC2_0)), r)),
		];
	}
);

/**
 * Returns signed distance from `p` to 2D "X-sign" of given `size` and stroke
 * weight `r`.
 *
 * @remarks
 * Ported from original GLSL impl by Inigo Quilez:
 * - https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p -
 * @param size -
 * @param r -
 */
export const sdfRoundedX2 = defn(
	"float",
	"sdfRoundedX",
	["vec2", "float", "float"],
	(p, size, r) => {
		let q: Vec2Sym;
		return [
			(q = sym(abs(p))),
			ret(
				sub(
					length(sub(q, mul(min(add($x(q), $y(q)), size), FLOAT05))),
					r
				)
			),
		];
	}
);
