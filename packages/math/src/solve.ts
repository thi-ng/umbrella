import type { FnN2 } from "@thi.ng/api";
import { EPS } from "./api.js";
import { safeDiv } from "./safe-div.js";

/**
 * Produces a new function which computes derivative of the given
 * single-arg function. The extra optional arg `eps` is used to
 * define the step width for computing derived values:
 *
 * `f'(x) = (f(x + eps) - f(x)) / eps`
 *
 * The original function is assumed to be fully differentiable
 * in the interval the returned function is going to be used.
 * No validity checks of any form are done.
 *
 * {@link https://en.wikipedia.org/wiki/Derivative#Continuity_and_differentiability}
 *
 * @param fn -
 * @param eps -
 */
export const derivative =
	(f: (x: number) => number, eps = EPS) =>
	(x: number) =>
		(f(x + eps) - f(x)) / eps;

/**
 * Computes solution for linear equation: `ax + b = 0`.
 *
 * Note: Returns 0 iff `a == 0`
 *
 * @param a - slope
 * @param b - constant offset
 */
export const solveLinear: FnN2 = (a, b) => safeDiv(-b, a);

/**
 * Computes solutions for quadratic equation: `ax^2 + bx + c = 0`.
 * Returns array of real solutions.
 * Note: `a` MUST NOT be zero. If the quadratic term is missing,
 * use {@link solveLinear} instead.
 *
 * - {@link https://en.wikipedia.org/wiki/Quadratic_function}
 * - {@link https://en.wikipedia.org/wiki/Quadratic_equation}
 *
 * @param a - quadratic coefficient
 * @param b - linear coefficient
 * @param c - constant offset
 * @param eps - tolerance to determine multiple roots
 */
export const solveQuadratic = (a: number, b: number, c: number, eps = 1e-9) => {
	const d = 2 * a;
	let r = b * b - 4 * a * c;
	return r < 0
		? []
		: r < eps
		? [-b / d]
		: ((r = Math.sqrt(r)), [(-b - r) / d, (-b + r) / d]);
};

/**
 * Computes solutions for quadratic equation: `ax^3 + bx^2 + c*x + d = 0`.
 * Returns array of solutions, both real & imaginary.
 * Note: `a` MUST NOT be zero. If the cubic term is missing (i.e. zero),
 * use {@link solveQuadratic} or {@link solveLinear} instead.
 *
 * {@link https://en.wikipedia.org/wiki/Cubic_function}
 *
 * @param a - cubic coefficient
 * @param b - quadratic coefficient
 * @param c - linear coefficient
 * @param d - constant offset
 * @param eps - tolerance to determine multiple roots
 */
export const solveCubic = (
	a: number,
	b: number,
	c: number,
	d: number,
	eps = 1e-9
) => {
	const aa = a * a;
	const bb = b * b;
	const ba3 = b / (3 * a);
	const p = (3 * a * c - bb) / (3 * aa);
	const q = (2 * bb * b - 9 * a * b * c + 27 * aa * d) / (27 * aa * a);

	if (Math.abs(p) < eps) {
		return [Math.cbrt(-q) - ba3];
	} else if (Math.abs(q) < eps) {
		return p < 0
			? [-Math.sqrt(-p) - ba3, -ba3, Math.sqrt(-p) - ba3]
			: [-ba3];
	} else {
		const denom = (q * q) / 4 + (p * p * p) / 27;
		if (Math.abs(denom) < eps) {
			return [(-1.5 * q) / p - ba3, (3 * q) / p - ba3];
		} else if (denom > 0) {
			const u = Math.cbrt(-q / 2 - Math.sqrt(denom));
			return [u - p / (3 * u) - ba3];
		} else {
			const u = 2 * Math.sqrt(-p / 3),
				t = Math.acos((3 * q) / p / u) / 3,
				k = (2 * Math.PI) / 3;
			return [
				u * Math.cos(t) - ba3,
				u * Math.cos(t - k) - ba3,
				u * Math.cos(t - 2 * k) - ba3,
			];
		}
	}
};
