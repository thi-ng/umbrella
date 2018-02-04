import { Transducer } from "../api";
import { comp } from "../func/comp";
import { drop } from "./drop";
import { take } from "./take";

/**
 * Pagination helper. Returns transducer which extracts
 * only items for given page number (and page length,
 * default 10). When composing with other transducers,
 * it's most efficient if `page()` is used prior to
 * any heavy processing steps.
 *
 * ```
 * [...iterator(page(0, 5), range(12))]
 * // [ 0, 1, 2, 3, 4 ]
 *
 * [...iterator(page(1, 5), range(12))]
 * // [ 5, 6, 7, 8, 9 ]
 *
 * [...iterator(page(2, 5), range(12))]
 * // [ 10, 11 ]
 *
 * [...iterator(page(3, 5), range(12))]
 * // []
 * ```
 *
 * @param page
 * @param pageLen
 */
export function page<T>(page: number, pageLen = 10): Transducer<T, T> {
    return comp(drop(page * pageLen), take(pageLen));
}
