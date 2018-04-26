import { IObjectOf } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { groupByObj } from "./group-by-obj";
import { push } from "./push";

function branchPred<T>(key: (x: T) => number, b: number, l: PropertyKey, r: PropertyKey) {
    return (x: T) => key(x) & b ? r : l;
}

/**
 * Creates a bottom-up, unbalanced binary tree of desired depth and
 * choice of data structures. Any value can be indexed, as long as a
 * numeric representation (key) can be obtained. This mapping is produced
 * by the supplied `key` function. IMPORTANT: the returned values
 * MUST be unsigned and less than the provided bit length (i.e. 2^`bits`).
 *
 * By default the tree is constructed using plain objects for branches,
 * with left branches stored as "l" and right ones as "r". The original
 * values are stored at the lowest tree level using a customizable nested
 * reducer. By default leaves are collected in arrays (using the `push()`
 * reducer), but any suitable reducer can be used (e.g. `conj()` to
 * collect values into sets).
 *
 * Index by lowest 4-bits of ID value:
 *
 * ```
 * tree = reduce(
 *   groupBinary(4, x => x.id & 0xf),
 *   [{id: 3}, {id: 8}, {id: 15}, {id: 0}]
 * )
 *
 * tree.l.l.l.l
 * // [ { id: 0 } ]
 * tree.r.r.r.r
 * // [ { id: 15 } ]
 * tree.l.l.r.r
 * // [ { id: 3 } ]
 * ```
 *
 * Collecting as array:
 *
 * ```
 * tree = reduce(
 *   groupBinary(4, identity, ()=>[], push(), 0, 1),
 *   [1,2,3,4,5,6,7]
 * )
 *
 * tree[0][1][0][1] // 0101 == 5 in binary
 * // [ 5 ]
 *
 * tree[0][1][1]    // 011* == branch
 * // [ [ 6 ], [ 7 ] ]
 * ```
 *
 * Using `frequencies` as leaf reducer:
 *
 * ```
 * tree = reduce(
 *   groupBinary(3, (x: string) => x.length, null, frequencies()),
 *   "aa bbb dddd ccccc bbb eeee fff".split(" ")
 * )
 * // [ [ undefined,
 * //     [ Map { 'aa' => 1 },
 * //       Map { 'bbb' => 2, 'fff' => 1 } ] ],
 * //   [ [ Map { 'dddd' => 1, 'eeee' => 1 },
 * //       Map { 'ccccc' => 1 } ] ] ]
 *
 * tree[0][1][1]
 * // Map { 'bbb' => 2, 'fff' => 1 }
 * ```
 *
 * @param bits index range (always from 0)
 * @param key key function
 * @param branch function to create a new branch container (object or array)
 * @param leaf reducer for leaf collection
 * @param left key for storing left branches (e.g. `0` for arrays)
 * @param right key for storing right branches (e.g. `1` for arrays)
 */
export function groupBinary<T>(
    bits: number,
    key: (x: T) => number,
    branch?: () => IObjectOf<T[]>,
    leaf: Reducer<any, T> = push(),
    left: PropertyKey = "l",
    right: PropertyKey = "r") {

    let rfn: Reducer<any, T> = groupByObj(
        branchPred(key, 1, left, right),
        leaf,
        branch
    );
    for (let i = 2, maxIndex = 1 << bits; i < maxIndex; i <<= 1) {
        rfn = groupByObj(branchPred(key, i, left, right), rfn, branch);
    }
    return rfn;
}
