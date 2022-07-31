import type { Fn2 } from "@thi.ng/api";
import type { FloatTerm, Vec4Sym } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, FLOAT1, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { add, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $w } from "@thi.ng/shader-ast/ast/swizzle";
import { clamp01 } from "../math/clamp.js";

const coeff = (
	f: Fn2<FloatTerm, FloatTerm, FloatTerm>,
	a: Vec4Sym,
	b: Vec4Sym
) => (f === ZERO ? FLOAT0 : f === ONE ? a : mul(a, f($w(a), $w(b))));

/**
 * Higher-order Porter-Duff alpha compositing operator. See
 * {@link @thi.ng/porter-duff# | @thi.ng/porter-duff} for reference. Returns an optimized AST
 * function which accepts 2 RGBA colors (vec4) and returns blended &
 * clamped result (also a vec4). All built-in PD operators are defined
 * via this HOF.
 *
 * The two given JS functions are used to extract blending coefficients
 * for src/dest colors and are called with the alpha components of both
 * colors.
 *
 * Optimization only happens for cases where either `fa` and/or `fb` are
 * {@link ZERO}.
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
	defn("vec4", name, ["vec4", "vec4"], (a, b) => {
		const src = coeff(fa, a, b);
		const dest = coeff(fb, a, b);
		const srcZero = src === FLOAT0;
		const destZero = dest === FLOAT0;
		return [
			ret(
				srcZero && destZero
					? vec4()
					: clamp01(srcZero ? dest : destZero ? src : add(src, dest))
			),
		];
	});

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
