import type { Transducer } from "../api";
import { comp } from "../func/comp";
import { $iter } from "../iterator";
import { drop } from "./drop";
import { take } from "./take";

/**
 * Pagination helper. Returns transducer which extracts only items for
 * given page number (and page length, default 10).
 *
 * @remarks
 * When {@link (comp:1) | composing} with other transducers, it's most
 * efficient if `page` is used as early as possible / prior to any heavy
 * processing steps.
 *
 * @example
 * ```ts
 * [...page(0, 5, range(12))]
 * // [ 0, 1, 2, 3, 4 ]
 *
 * [...page(1, 5, range(12))]
 * // [ 5, 6, 7, 8, 9 ]
 *
 * [...page(2, 5, range(12))]
 * // [ 10, 11 ]
 *
 * [...page(3, 5, range(12))]
 * // []
 * ```
 *
 * @param page -
 * @param pageLen -
 */
export function page<T>(page: number, pageLen?: number): Transducer<T, T>;
export function page<T>(page: number, src: Iterable<T>): IterableIterator<T>;
export function page<T>(
    page: number,
    pageLen: number,
    src: Iterable<T>
): IterableIterator<T>;
export function page(...args: any[]): any {
    return (
        $iter(page, args) ||
        comp(drop(args[0] * (args[1] || 10)), take(args[1] || 10))
    );
}
