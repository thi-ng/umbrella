import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { weightedRandom } from "@thi.ng/random/weighted-random";
import { repeatedly } from "./repeatedly.js";

/**
 * Returns an infinite iterator of random choices and their (optional)
 * weights. If `weights` is given, it must have at least the same size
 * as `choices`. If omitted, each choice will have same probability.
 *
 * @example
 * ```ts
 * transduce(take(1000), frequencies(), choices("abcd", [1, 0.5, 0.25, 0.125]))
 * // Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
 * ```
 *
 * {@link @thi.ng/random#weightedRandom}
 *
 * @param choices -
 * @param weights -
 */
export const choices = <T>(
    choices: ArrayLike<T> & Iterable<T>,
    weights?: ArrayLike<number>,
    rnd: IRandom = SYSTEM
): IterableIterator<T> =>
    repeatedly(
        weights
            ? weightedRandom(ensureArray(choices), weights, rnd)
            : () => choices[rnd.float(choices.length) | 0]
    );
