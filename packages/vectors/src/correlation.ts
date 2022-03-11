import type { ReadonlyVec } from "./api.js";
import { center } from "./center.js";
import { mag } from "./mag.js";
import { mul } from "./mul.js";
import { sum } from "./sum.js";

/**
 * Computes the Pearson correlation coefficient between `a` and `b`. Returns
 * `undefined` if the denominator (see below) is zero.
 *
 * @remarks
 * ```text
 * sum(a' * b') / (mag(a') * mag(b'))
 * ```
 *
 * ...where `a'` and `b'` are {@link center}'ed versions of given input vectors.
 *
 * References:
 * - https://en.wikipedia.org/wiki/Correlation
 * - https://www.youtube.com/watch?v=2bcmklvrXTQ
 *
 * @param a - 
 * @param b - 
 */
export const correlation = (a: ReadonlyVec, b: ReadonlyVec) => {
    a = center([], a);
    b = center([], b);
    const m = mag(a) * mag(b);
    return m !== 0 ? sum(mul(null, a, b)) / m : undefined;
};
