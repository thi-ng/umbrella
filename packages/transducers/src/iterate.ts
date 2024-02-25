import type { Fn2 } from "@thi.ng/api";

/**
 * Yields an infinite iterator of the inductive sequence:
 *
 * `f(x+1) = f(f(x))`
 *
 * @remarks
 * The first value emitted always is `seed` itself, then f(seed),
 * f(f(seed, i)) etc. The given function is called with the current
 * iteration counter as 2nd arg (starting w/ i=1).
 *
 * @example
 * ```ts
 * import { iterate } from "@thi.ng/transducers";
 *
 * [...iterate((x) => x * 2, 1, 5)]
 * // [ 1, 2, 4, 8, 16 ]
 *
 * [...iterate((x, i) => x * 10 + i, 0, 8)]
 * // [ 0, 1, 12, 123, 1234, 12345, 123456, 1234567 ]
 * ```
 *
 * @param fn -
 * @param seed -
 * @param num -
 */
export function* iterate<T>(
	fn: Fn2<T, number, T>,
	seed: T,
	num = Infinity
): IterableIterator<T> {
	for (let i = 1; i <= num; i++) {
		yield seed;
		seed = fn(seed, i);
	}
}
