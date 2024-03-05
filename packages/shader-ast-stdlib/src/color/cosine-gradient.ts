import {
	TAU,
	add,
	cos,
	mul,
	type FloatTerm,
	type Vec3Term,
} from "@thi.ng/shader-ast";

/**
 * Inline function. Computes the unclamped cosine-based color gradient value:
 * `a+b*cos(2π*(c*t+d))`, where `a`..`d` are the gradient coefficients and `t`
 * the gradient position in the [0,1] interval.
 *
 * @remarks
 * Based on technique by Inigo Quilez
 *
 * References:
 * - https://iquilezles.org/articles/palettes/
 * - https://github.com/thi-ng/umbrella/tree/develop/packages/color#cosine-gradients
 *
 * @example
 * ```ts
 * import { cosineGradient, COSINE_GRADIENTS } from "@thi.ng/shader-ast-stdlib";
 *
 * const rgb = cosineGradient(...COSINE_GRADIENTS["rainbow1"], 0.8)
 * ```
 *
 * @param a
 * @param b
 * @param c
 * @param d
 * @param t
 */
export const cosineGradient = (
	a: Vec3Term,
	b: Vec3Term,
	c: Vec3Term,
	d: Vec3Term,
	t: FloatTerm
) => add(a, mul(b, cos(mul(TAU, add(mul(c, t), d)))));
