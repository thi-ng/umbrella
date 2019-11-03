import { concat } from "./concat";
import { repeat } from "./repeat";

/**
 * Returns iterator of `src` padded with value `x`, repeated `n` times
 * (default: once) on either side (by default both sides are padded).
 *
 * Essentially, syntax sugar for:
 *
 * ```
 * // default
 * concat(repeat(x, n), src, repeat(x, n))
 *
 * // left only
 * concat(repeat(x, n), src)
 *
 * // right only
 * concat(src, repeat(x, n))
 * ```
 *
 * @see extendsSides
 * @see wrap
 *
 * @param src
 * @param x
 * @param n
 * @param left
 * @param right
 */
export const padSides = <T>(
    src: Iterable<T>,
    x: T,
    n = 1,
    left = true,
    right = true
) => {
    const pad = [...repeat(x, n)];
    return left
        ? right
            ? concat(pad, src, pad)
            : concat(pad, src)
        : right
        ? concat(src, pad)
        : concat(src);
};
