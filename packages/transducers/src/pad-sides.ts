import { concat } from "./concat.js";
import { repeat } from "./repeat.js";

/**
 * Returns iterator of `src` padded with value `x`, repeated
 * `numLeft`/`numRight` times (default: 1). By default both sides are padded,
 * but can be adjusted by setting either of them to zero. `numRight` defaults to
 * same value as `numLeft`.
 *
 * @remarks
 * Essentially syntax sugar for code below. Also see {@link extendSides},
 * {@link wrapSides}.
 *
 * @example
 * ```ts
 * import { concat, repeat } from "@thi.ng/transducers";
 *
 * // default
 * concat(repeat(x, numLeft), src, repeat(x, numRight))
 *
 * // left only
 * concat(repeat(x, numLeft), src)
 *
 * // right only
 * concat(src, repeat(x, numRight))
 * ```
 *
 * @param src -
 * @param x -
 * @param numLeft -
 * @param numRight -
 */
export const padSides = <T>(
	src: Iterable<T>,
	x: T,
	numLeft = 1,
	numRight = numLeft
): IterableIterator<T> =>
	numLeft > 0
		? numRight > 0
			? concat(repeat(x, numLeft), src, repeat(x, numRight))
			: concat(repeat(x, numLeft), src)
		: numRight > 0
		? concat(src, repeat(x, numRight))
		: concat(src);
