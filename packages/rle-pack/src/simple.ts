import type { Predicate2 } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/**
 * Performs basic RLE encoding on the given `src` array(like) input, using the
 * optional `equiv` predicate to determine if the current value is a repetition
 * of an earlier one (i.e consecutive values are considered repetitions as long
 * as that predicate returns true). The default predicate is using `===` for
 * comparison. Returns RLE result array of `[value1, count1, value2, count2...]`
 *
 * @example
 * ```ts tangle:../export/encode-simple.ts
 * import { encodeSimple } from "@thi.ng/rle-pack";
 *
 * const src = [..."aaaaaabbbbaaaxyxxx"];
 *
 * console.log(src);
 * // ["a", "a", "a", "a", "a", "a", "b", "b", "b", "b", "a", "a", "a", "x", "y", "x", "x", "x"]
 *
 * console.log(encodeSimple(src));
 * // ["a", 6, "b", 4, "a", 3, "x", 1, "y", 1, "x", 3]
 * ```
 *
 * @param src
 * @param equiv
 */
export const encodeSimple = <T = any>(
	src: ArrayLike<T>,
	equiv: Predicate2<T> = (a, b) => a === b
) => {
	const result: any[] = [];
	const n = src.length;
	if (!n) return result;
	let val = src[0];
	let start = 0;
	for (let i = 1; i < n; i++) {
		if (!equiv(src[i], val)) {
			result.push(val, i - start);
			val = src[i];
			start = i;
		}
	}
	result.push(val, n - start);
	return result;
};

/**
 * Reverse op of {@link encodeSimple}. Takes an RLE array and returns restored
 * original version. Throws an error if `src.length` is not even.
 *
 * @param src
 */
export const decodeSimple = (src: any[]) => {
	const n = src.length;
	if (n & 1) illegalArgs(`input length must be even`);
	const result: any[] = [];
	for (let i = 0; i < n; i += 2) {
		const val = src[i];
		const count = src[i + 1];
		for (let j = 0; j < count; j++) result.push(val);
	}
	return result;
};
