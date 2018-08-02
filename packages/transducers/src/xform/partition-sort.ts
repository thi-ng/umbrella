import { Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/compare";

import { Transducer } from "../api";
import { comp } from "../func/comp";
import { identity } from "../func/identity";
import { mapcat } from "./mapcat";
import { partition } from "./partition";

/**
 * Transducer. Composition of `partition` and `mapcat` which yields a
 * **partially** sorted sequence of input values. Sorting is performed on
 * sliding / non-overlapping chunks of `n` inputs. The optional `key`
 * and `cmp` function args can be used to select / compute a sortable
 * value and change sorting behavior.
 *
 * ```
 * [...iterator(partitionSort(4), [5,9,2,6,4,1,3,8,7,0])]
 * // [ 2, 5, 6, 9, 1, 3, 4, 8, 0, 7 ]
 *
 * // with key fn and custom comparator
 * [...iterator(
 *   partitionSort(3, (x) => x.val, (a, b) => b - a),
 *   [
 *     { id: "a", val: 5 },
 *     { id: "b", val: 7 },
 *     { id: "c", val: 8 }
 *   ]
 * )]
 * // [ { id: 'c', val: 8 }, { id: 'b', val: 7 }, { id: 'a', val: 5 } ]
 * ```
 *
 * @param n window size
 * @param key sort key lookup
 * @param cmp comparator
 */
export function partitionSort<A, B>(n: number, key: ((x: A) => B) = <any>identity, cmp: Comparator<B> = compare): Transducer<A, A> {
    return comp(
        partition(n, true),
        mapcat((chunk: A[]) => chunk.sort((a, b) => cmp(key(a), key(b))))
    );
}
