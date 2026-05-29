// SPDX-License-Identifier: Apache-2.0

/**
 * Returns true if `x` is a number and a multiple of given `base` (using `eps`
 * tolerance, default: 1e-6).
 *
 * @example
 * ```ts tangle:../export/is-multiple.ts
 * import { isMultipleOf } from "@thi.ng/checks";
 *
 * console.log(isMultipleOf(0.1, 0.3));
 * // true
 * ```
 *
 * @param base
 * @param x
 * @param eps
 */
export const isMultipleOf = (base: number, x: any, eps = 1e-6) => {
	if (x === 0) throw new Error("base must be non-zero");
	if (typeof x !== "number") return false;
	const quot = x / base;
	return Math.abs(quot - Math.round(quot)) < eps;
};
