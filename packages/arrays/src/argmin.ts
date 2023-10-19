import type { Predicate2 } from "@thi.ng/api";

/**
 * Takes an array of numbers and returns the index of the item which is
 * considered the minimum value according to the given initial `min` value
 * (default: ∞) and predicate (both optional). Returns -1 if `items` is empty.
 *
 * @remarks
 * See {@link argMax}.
 *
 * @example
 * ```ts
 * argMin([42, 11, 66, 23])
 * // 1
 *
 * // same as argmax() with defaults
 * argMin([42, 11, 66, 23], -Infinity, (a, b) => a > b)
 * // 2
 * ```
 *
 * @param buf
 * @param min
 * @param pred
 */
export const argMin = (
	buf: ArrayLike<number>,
	min = Infinity,
	pred: Predicate2<number> = (a, b) => a < b
) => {
	let id = -1;
	for (let i = 0, n = buf.length; i < n; i++) {
		const x = buf[i];
		if (pred(x, min)) {
			min = x;
			id = i;
		}
	}
	return id;
};

/**
 * Similar to {@link argMin}, but selects index of maximum item. Returns -1 if
 * `items` is empty.
 *
 * @param items
 * @param min
 * @param pred
 */
export const argMax = (
	items: ArrayLike<number>,
	min = -Infinity,
	pred: Predicate2<number> = (a, b) => a > b
) => argMin(items, min, pred);
