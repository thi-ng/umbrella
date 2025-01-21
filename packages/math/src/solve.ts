// SPDX-License-Identifier: Apache-2.0
import type { FnN2, NumericArray } from "@thi.ng/api";
import { EPS } from "./api.js";
import { safeDiv } from "./safe-div.js";

/**
 * Produces a new function which computes derivative of the given single-arg
 * function.
 *
 * @remarks
 * The extra optional arg `eps` is used to define the step width for
 * computing derived values:
 *
 * `f'(x) = (f(x + eps) - f(x)) / eps`
 *
 * The original function is assumed to be fully differentiable in the interval
 * the returned function is going to be used. No validity checks of any form are
 * done.
 *
 * https://en.wikipedia.org/wiki/Derivative#Continuity_and_differentiability
 *
 * @param fn -
 * @param eps -
 */
export const derivative =
	(f: (x: number) => number, eps = EPS) =>
	(x: number) =>
		(f(x + eps) - f(x)) / eps;

/**
 * Computes solution for linear equation: `ax + b = 0`. Returns 0 iff `a == 0`
 *
 * @param a - slope
 * @param b - constant offset
 */
export const solveLinear: FnN2 = (a, b) => safeDiv(-b, a);

/**
 * Computes solutions for quadratic equation: `ax^2 + bx + c = 0`. Returns array
 * of real solutions.
 *
 * @remarks
 * `a` MUST NOT be zero. If the quadratic term is missing, use
 * {@link solveLinear} instead.
 *
 * - https://en.wikipedia.org/wiki/Quadratic_function
 * - https://en.wikipedia.org/wiki/Quadratic_equation
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
 * Returns array of solutions, both real & imaginary. Note: `a` MUST NOT be
 * zero. If the cubic term is missing (i.e. zero), use {@link solveQuadratic} or
 * {@link solveLinear} instead.
 *
 * https://en.wikipedia.org/wiki/Cubic_function
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

/**
 * Solves a system of linear equations for N unknowns: `a[i]*x[i−1] + b[i]*x[i]
 * + c[i]*x[i+1] = d[i]`, where a[0]=0 and c[N-1]=0. Writes solutions `x[i]` back into
 * array of input coefficients `d` and returns it. The other arrays are not modified.
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Tridiagonal_matrix_algorithm
 *
 * @param a - subdiagonal [1,N-1], a[0] is lower left corner
 * @param b - main diagonal [0,N-1]
 * @param c - superdiagonal [0,N-2], c[N-1] is upper right corner
 * @param d - input coefficients & output solutions [0,N-1]
 */
export const solveTridiagonal = (
	a: NumericArray,
	b: NumericArray,
	c: NumericArray,
	d: NumericArray
) => {
	const n = d.length - 1;
	const tmp = new Array(n + 1);
	tmp[0] = c[0] / b[0];
	d[0] = d[0] / b[0];

	for (let i = 1; i <= n; i++) {
		const ai = a[i];
		const bi = b[i];
		const denom = 1 / (bi - ai * tmp[i - 1]);
		tmp[i] = c[i] * denom;
		d[i] = (d[i] - ai * d[i - 1]) * denom;
	}

	for (let i = n; i-- > 0; ) {
		d[i] -= tmp[i] * d[i + 1];
	}

	return d;
};
