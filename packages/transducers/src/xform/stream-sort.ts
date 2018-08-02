import { Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/compare";

import { Reducer, Transducer } from "../api";
import { binarySearch } from "../func/binary-search";
import { identity } from "../func/identity";
import { isReduced } from "../reduced";

/**
 * Transducer. Similar to `partitionSort()`, however uses proper sliding
 * window and insertion sort instead of fully sorting window as done by
 * `partitionSort()`.
 *
 * ```
 * [...iterator(streamSort(4), [5,9,2,6,4,1,3,8,7,0])]
 * // [ 2, 4, 1, 3, 5, 6, 0, 7, 8, 9 ]
 * ```
 *
 * @param n
 * @param key
 * @param cmp
 */
export function streamSort<A, B>(n: number, key: ((x: A) => B) = <any>identity, cmp: Comparator<B> = compare): Transducer<A, A> {
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
                const idx = binarySearch(buf, key, cmp, x);
                buf.splice(Math.abs(idx), 0, x);
                if (buf.length === n) {
                    acc = reduce(acc, buf.shift());
                }
                return acc;
            }
        ];
    };
}
