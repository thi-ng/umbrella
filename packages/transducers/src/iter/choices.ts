import { weightedRandom } from "../func/weighted-random";
import { repeatedly } from "./repeatedly";
import { IRandom, SYSTEM } from "@thi.ng/random";

/**
 * Returns an infinite iterator of random choices and their (optional)
 * weights. If `weights` is given, it must have at least the same size
 * as `choices`. If omitted, each choice will have same probability.
 *
 * ```
 * transduce(take(1000), frequencies(), choices("abcd", [1, 0.5, 0.25, 0.125]))
 * // Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
 * ```
 *
 * @see weightedRandom
 *
 * @param choices
 * @param weights
 */
export const choices = <T>(
    choices: ArrayLike<T> & Iterable<T>,
    weights?: ArrayLike<number> & Iterable<number>,
    rnd: IRandom = SYSTEM
) =>
    repeatedly(
        weights ?
            weightedRandom(choices, weights, rnd) :
            () => choices[(rnd.float(choices.length) | 0)]
    );
