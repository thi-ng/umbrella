// SPDX-License-Identifier: Apache-2.0
import type { FnN2 } from "@thi.ng/api";

/**
 * Iteratively computes Greatest Common Divisor of given `a` and `b`.
 *
 * @remarks
 * Reference:
 *
 * - https://en.wikipedia.org/wiki/Greatest_common_divisor
 *
 * @param a
 * @param b
 */
export const gcd: FnN2 = (a, b) => {
	a = Math.abs(a);
	b = Math.abs(b);
	while (b !== 0) {
		const tmp = b;
		b = a % b;
		a = tmp;
	}
	return a;
};

/**
 * Computes Least Common Multiple for given `a` and `b`. Returns zero if either
 * input is zero.
 *
 * @remarks
 * Reference:
 *
 * - https://en.wikipedia.org/wiki/Least_common_multiple
 *
 * @param a
 * @param b
 */
export const lcm: FnN2 = (a, b) => {
	if (!Number.isFinite(a) || !Number.isFinite(b))
		throw new Error("both inputs must be finite");
	return a && b ? Math.abs(a * b) / gcd(a, b) : 0;
};

/**
 * Converts given `x` to a fraction with optional `maxDenom`inator, using
 * continued fractions for best possible precision.
 *
 * @remarks
 * Reference:
 *
 * - https://en.wikipedia.org/wiki/Continued_fraction
 *
 * @example
 * ```ts tangle:../export/as-fraction.ts
 * import { asFraction } from "@thi.ng/math";
 *
 * console.log(Math.PI, asFraction(Math.PI));
 * // 3.141592653589793 [1146408, 364913]
 *
 * // keep denominator <= 1000
 * console.log(Math.PI, asFraction(Math.PI, 1000));
 * // 3.141592653589793 [ 355, 113 ]
 * ```
 *
 * @param x
 * @param maxDenom
 */
export const asFraction = (x: number, maxDenom = 1e6) => {
	if (!Number.isFinite(x)) throw new Error("input must be a finite");
	if (Number.isInteger(x)) return [x, 1];

	const sign = Math.sign(x);
	x = Math.abs(x);

	let n0 = 0;
	let n1 = 1;
	let d0 = 1;
	let d1 = 0;

	while (true) {
		const i = Math.floor(x);
		const d2 = i * d1 + d0;
		if (d2 > maxDenom) break;

		const n2 = i * n1 + n0;
		n0 = n1;
		n1 = n2;
		d0 = d1;
		d1 = d2;

		const rem = x - i;
		if (rem < Number.EPSILON) break;
		x = 1 / rem;
	}

	return [sign * n1, d1];
};

/**
 * Reverse op of {@link asFraction}. Converts a fraction tuple to a JS number.
 *
 * @param fraction
 */
export const asFloat = ([a, b]: [number, number]) => a / b;
