import type { IRandom } from "./api.js";
import { SYSTEM } from "./system.js";

/**
 * Returns a random element from `src` using given {@link IRandom} instance
 * (default: {@link SYSTEM}). The index selection will be constrained to the
 * `[start,end)` interval (default: entire array).
 *
 * @param src -
 * @param rnd -
 * @param start -
 * @param end -
 */
export const pickRandom = <T>(
	src: ArrayLike<T>,
	rnd: IRandom = SYSTEM,
	start = 0,
	end = src.length
) => src[rnd.minmax(start, end) | 0];

/**
 * Returns a random key from given `object`.
 *
 * @param obj
 * @param rnd
 */
export const pickRandomKey = <T extends object>(
	obj: T,
	rnd: IRandom = SYSTEM
) => pickRandom(<(keyof T)[]>Object.keys(obj), rnd);
