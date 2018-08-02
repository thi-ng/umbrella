import { Transducer } from "../api";
import { comp } from "../func/comp";
import { cat } from "./cat";
import { map } from "./map";

/**
 * Transducer. Similar to `map`, but expects the given mapping function
 * `fn` to return an iterable result (or `null`) and then emits each
 * value of the result individually downstream. `null` or `undefined`
 * result values will be skipped / omitted.
 *
 * @example
 * ```
 * [...iterator(mapcat((x) => [x, x]), [1, 2, 3])]
 * // [ 1, 1, 2, 2, 3, 3 ]
 *
 * [...iterator(mapcat((x) => x > 2 ? [x, x, x] : null), [1, 2, 3])]
 * // [ 3, 3, 3 ]
 * ```
 *
 * @param fn mapping function
 */
export function mapcat<A, B>(fn: (x: A) => Iterable<B>): Transducer<A, B> {
    return comp(map(fn), cat());
}
