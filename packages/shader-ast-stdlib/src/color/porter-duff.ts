import type { Fn2 } from "@thi.ng/api";
import type { FloatTerm, Vec4Sym } from "@thi.ng/shader-ast";
import { V4 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, FLOAT1, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $w, $xyz } from "@thi.ng/shader-ast/ast/swizzle";
import { clamp01 } from "../math/clamp.js";

/** @internal */
const __coeff = (col: Vec4Sym, f: FloatTerm) =>
	f === FLOAT0 ? vec4() : f === FLOAT1 ? col : mul(col, f);

/**
 * Higher-order Porter-Duff alpha compositing operator. See
 * [thi.ng/porter-duff](https://thi.ng/porter-duff) for reference. Returns an
 * optimized AST function which accepts 2 RGBA colors (vec4) and returns blended
 * & clamped result (also a vec4).
 *
 * @remark
 * All built-in PD operators are defined via this HOF. The two given coefficient
 * functions are used to extract blending coefficients for src/dest colors and
 * are called with the alpha components of both colors.
 *
 * - `blendSrcOver(src, dest)`
 * - `blendDestOver(src, dest)`
 * - `blendSrcIn(src, dest)`
 * - `blendDestIn(src, dest)`
 * - `blendSrcOut(src, dest)`
 * - `blendDestOut(src, dest)`
 * - `blendSrcAtop(src, dest)`
 * - `blendDestAtop(src, dest)`
 * - `blendXor(src, dest)`
 * - `blendPlus(src, dest)`
 *
 * Optimization only happens for cases where either `fa` and/or `fb` are
 * {@link ZERO} or {@link ONE}.
 *
 * *IMPORTANT*: Both colors MUST be use pre-multiplied alpha for correct
 * results. If needed, use {@link premultiplyAlpha} and
 * {@link postmultiplyAlpha}.
 *
 * @param name - function name
 * @param fa - src coeff fn
 * @param fb - dest coeff fn
 */
export const porterDuff = (
	name: string,
	fa: Fn2<FloatTerm, FloatTerm, FloatTerm>,
	fb: Fn2<FloatTerm, FloatTerm, FloatTerm>
) =>
	defn(V4, name, [V4, V4], (a, b) => {
		const sa = fa($w(a), $w(b));
		const sb = fb($w(a), $w(b));
		const src = __coeff(a, sa);
		const dest = __coeff(b, sb);
		const srcZero = sa === FLOAT0;
		const destZero = sb === FLOAT0;
		return [
			ret(
				srcZero && destZero
					? vec4()
					: clamp01(srcZero ? dest : destZero ? src : add(src, dest))
			),
		];
	});

/**
 * Multiplies RGB channels by alpha. Returns `vec4(col.r*col.a, col.g*col.a,
 * col.b*col.a, col.a)`. See {@link postmultiplyAlpha} for reverse op.
 *
 * @param col
 */
export const premultiplyAlpha = (col: Vec4Sym) =>
	vec4(mul($xyz(col), $w(col)), $w(col));

/**
 * Divides RGB channels by alpha. Returns `vec4(col.r/col.a, col.g/col.a,
 * col.b/col.a, col.a)`. See {@link premultiplyAlpha} for reverse op.
 *
 * @param col
 */
export const postmultiplyAlpha = (col: Vec4Sym) =>
	vec4(div($xyz(col), $w(col)), $w(col));

// coefficient functions

export const ZERO = () => FLOAT0;
export const ONE = () => FLOAT1;
export const A = (a: FloatTerm) => a;
export const B = (_: FloatTerm, b: FloatTerm) => b;
export const ONE_MINUS_A = (a: FloatTerm) => sub(FLOAT1, a);
export const ONE_MINUS_B = (_: FloatTerm, b: FloatTerm) => sub(FLOAT1, b);

// standard Porter-Duff operators

export const blendSrcOver = porterDuff("blendSrcOver", ONE, ONE_MINUS_A);
export const blendDestOver = porterDuff("blendDestOver", ONE_MINUS_B, ONE);
export const blendSrcIn = porterDuff("blendSrcIn", B, ZERO);
export const blendDestIn = porterDuff("blendDestIn", ZERO, A);
export const blendSrcOut = porterDuff("blendSrcOut", ONE_MINUS_B, ZERO);
export const blendDestOut = porterDuff("blendDestOut", ZERO, ONE_MINUS_A);
export const blendSrcAtop = porterDuff("blendSrcAtop", B, ONE_MINUS_A);
export const blendDestAtop = porterDuff("blendDestAtop", ONE_MINUS_B, A);
export const blendXor = porterDuff("blendXor", ONE_MINUS_B, ONE_MINUS_A);
export const blendPlus = porterDuff("blendPlus", ONE, ONE);
