import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

import { range } from "./range";

/**
 * Iterator yielding the Cartesian Product of the given iterables.
 * All iterables MUST be finite! If any of the given iterables is
 * empty the iterator yields no values.
 *
 * ```
 * [...permutations(range(3), "ab")]
 * // [ ['a', 0], ['a', 1], ['a', 2],
 * //   ['b', 0], ['b', 1], ['b', 2] ]
 *
 * [...iterator(map((x: any[]) => x.join("")), permutations("ab", "-", tx.range(3)))]
 * // ['a-0', 'a-1', 'a-2', 'b-0', 'b-1', 'b-2']
 *
 * [...permutations([], "", range(0))]
 * // []
 * ```
 *
 * @param src
 */
export function permutations<A>(a: Iterable<A>): IterableIterator<[A]>;
export function permutations<A, B>(a: Iterable<A>, b: Iterable<B>): IterableIterator<[A, B]>;
export function permutations<A, B, C>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>): IterableIterator<[A, B, C]>;
export function permutations<A, B, C, D>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>): IterableIterator<[A, B, C, D]>;
export function* permutations(...src: Iterable<any>[]): IterableIterator<any[]> {
    const n = src.length - 1;
    if (n < 0) {
        return;
    }
    const step = new Array(n + 1).fill(0);
    const realized = src.map((s: any) => isArray(s) || isString(s) ? s : [...s]);
    const total = realized.reduce((acc, x) => acc * x.length, 1);
    for (let i = 0; i < total; i++) {
        const tuple = [];
        for (let j = n; j >= 0; j--) {
            const r = realized[j];
            let s = step[j];
            if (s === r.length) {
                step[j] = s = 0;
                j > 0 && (step[j - 1]++);
            }
            tuple[j] = r[s];
        }
        step[n]++;
        yield tuple;
    }
}

/**
 * Iterator yielding the Cartesian Product for `n` items of `m` values each.
 * If `m` is not given, defaults to value of `n`. The range of `m` is `0..m-1`.
 *
 * ```
 * [...permutationsN(2)]
 * // [ [0, 0], [0, 1], [1, 0], [1, 1] ]
 *
 * [...permutationsN(2, 3)]
 * // [ [0, 0], [0, 1], [0, 2],
 * //   [1, 0], [1, 1], [1, 2],
 * //   [2, 0], [2, 1], [2, 2] ]
 * ```
 *
 * @param n
 * @param m
 */
export function permutationsN(n: number, m = n, offsets?: number[]): IterableIterator<number[]> {
    if (offsets && offsets.length < n) {
        illegalArgs(`insufficient offsets, got ${offsets.length}, but needed ${n}`);
    }
    const seqs = [];
    while (--n >= 0) {
        const o = offsets ? offsets[n] : 0;
        seqs[n] = range(o, o + m);
    }
    return permutations.apply(null, seqs);
}
