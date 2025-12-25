// SPDX-License-Identifier: Apache-2.0
import { gaussianElimination } from "./solve.js";

/**
 * Computes polynomial for `x` and given `coeffs` (in order of increasing
 * exponents).
 *
 * @remarks
 * See {@link polynomialRegression} for computing coefficients.
 *
 * The number of given coefficients defines the degree (+1) of the polynomial,
 * i.e. a cubic function will require 4 coeffs, with the y-intercept being the
 * first coeff.
 *
 * @example
 * ```ts tangle:../export/polynomial.ts
 * import { polynomial } from "@thi.ng/math";
 *
 * const coeffs = [-5, -4, 3, 2];
 *
 * for(let x = -2; x <= 2; x += 0.5) {
 *   console.log(`f(${x}) = ${polynomial(x, coeffs)}`);
 * }
 * // f(-2) = -1
 * // f(-1.5) = 1
 * // f(-1) = 0
 * // f(-0.5) = -2.5
 * // f(0) = -5
 * // f(0.5) = -6
 * // f(1) = -4
 * // f(1.5) = 2.5
 * // f(2) = 15
 * ```
 *
 * @param x
 * @param coeffs
 */
export const polynomial = (x: number, coeffs: number[]) =>
	coeffs.reduce((sum, c, i) => sum + c * x ** i, 0);

/**
 * Computes the coefficients of a polynomial regression for the given `samples`
 * (each a [x,y] tuple). The `degree` param defines the degree of the polynomial
 * and the number of returned coefficients (+1).
 *
 * @remarks
 * The resulting coeffs can be then used with {@link polynomial} to evaluate the
 * curve (i.e. used to make predictions).
 *
 * @param samples
 * @param degree
 */
export const polynomialRegression = (samples: number[][], degree: number) => {
	const mat = [];
	const aug = [];
	for (let i = 0; i <= degree; i++) {
		const col = [];
		for (let j = 0; j <= degree; j++) {
			col.push(samples.reduce((acc, x) => acc + x[0] ** (i + j), 0));
		}
		mat.push(col);
		aug.push(samples.reduce((acc, x) => acc + x[0] ** i * x[1], 0));
	}
	mat.push(aug);
	return gaussianElimination(mat, degree + 1);
};
