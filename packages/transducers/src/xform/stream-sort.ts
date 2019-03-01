import { binarySearch } from "@thi.ng/arrays";
import { compare as cmp } from "@thi.ng/compare";
import { identity } from "@thi.ng/compose";
import { Reducer, SortOpts, Transducer } from "../api";
import { $iter, iterator } from "../iterator";
import { isReduced } from "../reduced";

/**
 * Transducer. Similar to `partitionSort()`, however uses proper sliding
 * window and insertion sort instead of fully sorting window as done by
 * `partitionSort()`.
 *
 * ```
 * [...streamSort(4, [5,9,2,6,4,1,3,8,7,0])]
 * // [ 2, 4, 1, 3, 5, 6, 0, 7, 8, 9 ]
 * ```
 *
 * @param n
 * @param key
 * @param cmp
 */
export function streamSort<A, B>(
    n: number,
    opts?: Partial<SortOpts<A, B>>
): Transducer<A, A>;
export function streamSort<A, B>(
    n: number,
    src: Iterable<A>
): IterableIterator<A>;
export function streamSort<A, B>(
    n: number,
    opts: Partial<SortOpts<A, B>>,
    src: Iterable<A>
): IterableIterator<A>;
export function streamSort<A, B>(...args: any[]): any {
    const iter = $iter(streamSort, args, iterator);
    if (iter) {
        return iter;
    }
    const { key, compare } = <SortOpts<A, B>>{
        key: <any>identity,
        compare: cmp,
        ...args[1]
    };
    const n = args[0];
    return ([init, complete, reduce]: Reducer<any, A>) => {
        const buf: A[] = [];
        return [
            init,
            (acc) => {
                while (buf.length && !isReduced(acc)) {
                    acc = reduce(acc, buf.shift());
                }
                return complete(acc);
            },
            (acc, x) => {
                const idx = binarySearch(buf, x, key, compare);
                buf.splice(idx < 0 ? -(idx + 1) : idx, 0, x);
                if (buf.length === n) {
                    acc = reduce(acc, buf.shift());
                }
                return acc;
            }
        ];
    };
}
