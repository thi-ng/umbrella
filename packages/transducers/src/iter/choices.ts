import { weightedRandom } from "../func/weighted-random";
import { repeatedly } from "./repeatedly";

/**
 * Returns an infinite iterator of random choices and their (optional)
 * weights. If `weights` is given, it must have at least the same size
 * as `choices`. If omitted, each choice will have same probability.
 *
 * See: `weightedRandom()`
 *
 * ```
 * transduce(take(1000), frequencies(), choices("abcd", [1, 0.5, 0.25, 0.125]))
 * // Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
 * ```
 *
 * @param choices
 * @param weights
 */
export function choices<T>(choices: ArrayLike<T> & Iterable<T>, weights?: ArrayLike<number> & Iterable<number>) {
    return repeatedly(
        weights ?
            weightedRandom(choices, weights) :
            () => choices[(Math.random() * choices.length) | 0]
    );
}
