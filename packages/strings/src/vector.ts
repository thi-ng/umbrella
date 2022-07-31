import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api.js";
import { float } from "./float.js";

/**
 * Higher order formatter for n-D vectors, with each element formatted using
 * `prec` and using optional delimiter and pre/postfixes.
 *
 * @size - vector size (optimized for size 1-4)
 * @prec - precision (see {@link float}) or existing number formatter
 * @delim - delimiter (default: `,`)
 * @pre - prefix (default: `[`)
 * @post - prefix (default: `]`)
 */
export const vector: (
	size: number,
	prec?: number | Stringer<number>,
	delim?: string,
	pre?: string,
	post?: string
) => Stringer<ArrayLike<number>> = memoizeJ(
	(
		size: number,
		prec: number | Stringer<number> = 3,
		d = ",",
		pre = "[",
		post = "]"
	) => {
		const f = typeof prec === "number" ? float(prec) : prec;
		switch (size) {
			case 1:
				return (v: ArrayLike<number>) => `${pre}${f(v[0])}${post}`;
			case 2:
				return (v: ArrayLike<number>) =>
					`${pre}${f(v[0])}${d}${f(v[1])}${post}`;
			case 3:
				return (v: ArrayLike<number>) =>
					`${pre}${f(v[0])}${d}${f(v[1])}${d}${f(v[2])}${post}`;
			case 4:
				return (v: ArrayLike<number>) =>
					`${pre}${f(v[0])}${d}${f(v[1])}${d}${f(v[2])}${d}${f(
						v[3]
					)}${post}`;
			default:
				return (v: ArrayLike<number>) => {
					const res = [];
					for (let i = 0; i < v.length; i++) {
						res.push(f(v[i]));
					}
					return `${pre}${res.join(d)}${post}`;
				};
		}
	}
);
